// src/main/java/com/capstone/safety_service/controllers/EmergencyContactController.java
package com.capstone.safety_service.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.capstone.safety_service.models.EmergencyContact;
import com.capstone.safety_service.service.EmergencyContactService;
import com.capstone.safety_service.dto.AlertPayload;
import java.util.List;

@RestController
@RequestMapping("/api/emergency-contacts")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmergencyContactController {
    private final EmergencyContactService emergencyContactService;

    @Autowired
    public EmergencyContactController(EmergencyContactService emergencyContactService) {
        this.emergencyContactService = emergencyContactService;
    }

    @PostMapping
    public ResponseEntity<EmergencyContact> createContact(@RequestBody EmergencyContact contact) {
        return ResponseEntity.ok(emergencyContactService.createContact(contact));
    }

    @GetMapping
    public List<EmergencyContact> getAllContacts() {
        return emergencyContactService.getAllContacts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmergencyContact> getContactById(@PathVariable Long id) {
        return emergencyContactService.getContactById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmergencyContact> updateContact(
        @PathVariable Long id,
        @RequestBody EmergencyContact updatedContact
    ) {
        try {
            EmergencyContact contact = emergencyContactService.updateContact(id, updatedContact);
            return ResponseEntity.ok(contact);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable Long id) {
        emergencyContactService.deleteContact(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/alert")
    public ResponseEntity<Void> alertAllContacts(@RequestBody AlertPayload alertPayload) {
        try {
            emergencyContactService.alertAllContacts(alertPayload);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}