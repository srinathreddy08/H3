package com.project.claude_demo.controller;

import com.project.claude_demo.service.SafetyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/safety")
public class SafetyController {
    private final SafetyService safetyService;

    @Autowired
    public SafetyController(SafetyService safetyService) {
        this.safetyService = safetyService;
    }

//    @GetMapping("/weather-safety-tip")
//    public ResponseEntity<String> getWeatherSafetyTip(@RequestParam String location) {
//        return ResponseEntity.ok(safetyService.getWeatherSafetyTip(location));
//    }

@GetMapping("/weather-details")
public ResponseEntity<Map<String, Object>> getWeatherDetails(@RequestParam String location) {
    return ResponseEntity.ok(safetyService.getWeatherDetails(location));
}

    @GetMapping("/nearby-police-stations")
    public ResponseEntity<List<String>> getNearbyPoliceStations(@RequestParam double lat, @RequestParam double lon) {
        return ResponseEntity.ok(safetyService.getNearbyPoliceStations(lat, lon));
    }

    @GetMapping("/nearby-hospitals")
    public ResponseEntity<List<String>> getNearbyHospitals(@RequestParam double lat, @RequestParam double lon) {
        return ResponseEntity.ok(safetyService.getNearbyHospitals(lat, lon));
    }
}