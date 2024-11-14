package com.capstone.safety_service.models;



import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class EmergencyContact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private long userId;
    
	private String name;
    private String phoneNumber;
    private String email;
    
    public EmergencyContact() {
    	
    }
	public EmergencyContact(Long id, long userId, String name, String phoneNumber, String email) {
		super();
		this.id = id;
		this.userId = userId;
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.email = email;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	@Override
	public String toString() {
		return "EmergencyContact [id=" + id + ", userId=" + userId + ", name=" + name + ", phoneNumber=" + phoneNumber
				+ ", email=" + email + "]";
	}
	
	

    
	
}