package com.capstone.safety_service.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capstone.safety_service.models.DangerArea;
import com.capstone.safety_service.service.DangerAreaService;

@RestController
@RequestMapping("/api/safety/danger-areas")
@CrossOrigin(origins="*",allowedHeaders = "*")
public class DangerAreaController {

    @Autowired
    private DangerAreaService dangerAreaService;
    // Get all danger areas
    @GetMapping
    public List<DangerArea> getAllDangerAreas() {
        return dangerAreaService.getAllDangerAreas();
    }

    // Get a specific danger area by ID
    @GetMapping("/{id}")
    public ResponseEntity<DangerArea> getDangerAreaById(@PathVariable Long id) {
        DangerArea dangerArea = dangerAreaService.getDangerAreaById(id);
        return dangerArea != null ? ResponseEntity.ok(dangerArea) : ResponseEntity.notFound().build();
    }

    // Create a new danger area
    @PostMapping
    public DangerArea createDangerArea(@RequestBody DangerArea dangerArea) {
        return dangerAreaService.createDangerArea(dangerArea);
    }

    // Update an existing danger area
    @PutMapping("/{id}")
    public ResponseEntity<DangerArea> updateDangerArea(@PathVariable Long id, @RequestBody DangerArea updatedDangerArea) {
        DangerArea dangerArea = dangerAreaService.updateDangerArea(id, updatedDangerArea);
        return dangerArea != null ? ResponseEntity.ok(dangerArea) : ResponseEntity.notFound().build();
    }

    // Delete a danger area
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDangerArea(@PathVariable Long id) {
        dangerAreaService.deleteDangerArea(id);
        return ResponseEntity.ok().build();
    }
}
