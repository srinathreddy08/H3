package com.capstone.safety_service.models;




import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

import java.util.Date;

@Entity
@Table(name = "danger_areas")
public class DangerArea {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    private String type; // e.g., crime, weather

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String location; // General location description or address

    @Column(nullable = false)
    private double latitude; // Latitude of the danger area

    @Column(nullable = false)
    private double longitude; // Longitude of the danger area

    @Temporal(TemporalType.TIMESTAMP)
    private Date timestamp;

    // Constructors
    public DangerArea() {}

    public DangerArea(String type, String description, String location, double latitude, double longitude, Date timestamp) {
        this.type = type;
        this.description = description;
        this.location = location;
        this.latitude = latitude;
        this.longitude = longitude;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
