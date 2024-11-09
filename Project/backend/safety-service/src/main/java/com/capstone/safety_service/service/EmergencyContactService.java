package com.capstone.safety_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.capstone.safety_service.models.EmergencyContact;
import com.capstone.safety_service.repository.EmergencyContactRepository;
import com.capstone.safety_service.dto.AlertPayload;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
@Transactional
public class EmergencyContactService {
    private final EmergencyContactRepository emergencyContactRepository;
    private final JavaMailSender emailSender;

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.phone.number}")
    private String fromPhoneNumber;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Autowired
    public EmergencyContactService(EmergencyContactRepository emergencyContactRepository, 
                                 JavaMailSender emailSender) {
        this.emergencyContactRepository = emergencyContactRepository;
        this.emailSender = emailSender;
    }

    @PostConstruct
    public void initTwilio() {
        Twilio.init(accountSid, authToken);
    }

    // Create an emergency contact
    public EmergencyContact createContact(EmergencyContact contact) {
        validateContact(contact);
        return emergencyContactRepository.save(contact);
    }

    // Get all emergency contacts
    public List<EmergencyContact> getAllContacts() {
        return emergencyContactRepository.findAll();
    }

    // Get a single contact by ID
    public Optional<EmergencyContact> getContactById(Long id) {
        return emergencyContactRepository.findById(id);
    }

    // Update an existing contact
    public EmergencyContact updateContact(Long id, EmergencyContact updatedContact) {
        validateContact(updatedContact);
        return emergencyContactRepository.findById(id)
            .map(existingContact -> {
                existingContact.setName(updatedContact.getName());
                existingContact.setPhoneNumber(updatedContact.getPhoneNumber());
                existingContact.setEmail(updatedContact.getEmail());
             
                return emergencyContactRepository.save(existingContact);
            })
            .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
    }

    // Delete a contact
    public void deleteContact(Long id) {
        if (!emergencyContactRepository.existsById(id)) {
            throw new RuntimeException("Contact not found with id: " + id);
        }
        emergencyContactRepository.deleteById(id);
    }

    // Validate contact information
    private void validateContact(EmergencyContact contact) {
        if (contact.getName() == null || contact.getName().trim().isEmpty()) {
            throw new IllegalArgumentException("Contact name cannot be empty");
        }
        if (contact.getPhoneNumber() == null || !contact.getPhoneNumber().matches("\\d{10}")) {
            throw new IllegalArgumentException("Invalid phone number format. Must be 10 digits");
        }
        if (contact.getEmail() != null && !contact.getEmail().isEmpty() && 
            !contact.getEmail().matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
            throw new IllegalArgumentException("Invalid email format");
        }
    }

    // Send emergency alerts to all contacts
    public void alertAllContacts(AlertPayload alertPayload) {
        List<EmergencyContact> contacts = emergencyContactRepository.findAll();
        
        if (contacts.isEmpty()) {
            throw new RuntimeException("No emergency contacts found");
        }

        String messageText = formatAlertMessage(alertPayload);
        String emailText = formatEmailMessage(alertPayload);

        for (EmergencyContact contact : contacts) {
            // Send SMS and email asynchronously
            CompletableFuture.runAsync(() -> {
                try {
                    if (contact.getPhoneNumber() != null && !contact.getPhoneNumber().isEmpty()) {
                        sendSMS(contact.getPhoneNumber(), messageText);
                    }
                } catch (Exception e) {
                    System.err.println("Failed to send SMS to " + contact.getPhoneNumber() + ": " + e.getMessage());
                }
            });

            CompletableFuture.runAsync(() -> {
                try {
                    if (contact.getEmail() != null && !contact.getEmail().isEmpty()) {
                        sendEmail(contact.getEmail(), emailText);
                    }
                } catch (Exception e) {
                    System.err.println("Failed to send email to " + contact.getEmail() + ": " + e.getMessage());
                }
            });
        }
    }

    // Format SMS alert message
    private String formatAlertMessage(AlertPayload alertPayload) {
        StringBuilder message = new StringBuilder("EMERGENCY ALERT!\n");
        message.append(alertPayload.getMessage());
        
        if (alertPayload.getLocation() != null) {
            message.append("\nLocation: ")
                  .append("https://www.google.com/maps?q=")
                  .append(alertPayload.getLocation().getLatitude())
                  .append(",")
                  .append(alertPayload.getLocation().getLongitude());
        }
        
        if (alertPayload.getTimestamp() != null) {
            message.append("\nTime: ").append(alertPayload.getTimestamp());
        }
        
        return message.toString();
    }

    // Format email alert message
    private String formatEmailMessage(AlertPayload alertPayload) {
        StringBuilder message = new StringBuilder();
        message.append("EMERGENCY ALERT!\n\n");
        message.append(alertPayload.getMessage()).append("\n\n");
        
        if (alertPayload.getLocation() != null) {
            message.append("Location: \n");
            String mapLink = String.format("https://www.google.com/maps?q=%f,%f",
                alertPayload.getLocation().getLatitude(),
                alertPayload.getLocation().getLongitude());
            message.append(mapLink).append("\n\n");
        }
        
        if (alertPayload.getTimestamp() != null) {
            message.append("Time: ").append(alertPayload.getTimestamp()).append("\n");
        }
        
        message.append("\nThis is an automated emergency alert. Please respond immediately if possible.");
        
        return message.toString();
    }

    private void sendSMS(String to, String messageText) {
        try {
            Message.creator(
                new PhoneNumber("+91" + to),
                new PhoneNumber(fromPhoneNumber),
                messageText
            ).create();
        } catch (Exception e) {
            throw new RuntimeException("Failed to send SMS: " + e.getMessage());
        }
    }

    // Send email using JavaMailSender
    private void sendEmail(String to, String messageText) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject("EMERGENCY ALERT - Immediate Attention Required");
            message.setText(messageText);
            emailSender.send(message);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send email: " + e.getMessage());
        }
    }
}