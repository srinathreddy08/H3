// AlertPayload.java
package com.capstone.safety_service.dto;

import lombok.Data;

@Data
public class AlertPayload {
    private String message;
    private Location location;
    private String timestamp;

    @Data
    public static class Location {
        private double latitude;
        private double longitude;
    }
}