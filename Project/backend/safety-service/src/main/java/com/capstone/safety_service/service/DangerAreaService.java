package com.capstone.safety_service.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capstone.safety_service.models.DangerArea;
import com.capstone.safety_service.repository.DangerAreaRepository;

@Service
public class DangerAreaService {

    @Autowired
    private DangerAreaRepository dangerAreaRepository;

    public List<DangerArea> getAllDangerAreas() {
        return dangerAreaRepository.findAll();
    }

    public DangerArea getDangerAreaById(Long id) {
        return dangerAreaRepository.findById(id).orElse(null);
    }

    public DangerArea createDangerArea(DangerArea dangerArea) {
        return dangerAreaRepository.save(dangerArea);
    }

    public DangerArea updateDangerArea(Long id, DangerArea updatedDangerArea) {
        return dangerAreaRepository.findById(id)
                .map(dangerArea -> {
                    dangerArea.setType(updatedDangerArea.getType());
                    dangerArea.setDescription(updatedDangerArea.getDescription());
                    dangerArea.setLocation(updatedDangerArea.getLocation());
                    dangerArea.setLatitude(updatedDangerArea.getLatitude());
                    dangerArea.setLongitude(updatedDangerArea.getLongitude());
                    dangerArea.setTimestamp(updatedDangerArea.getTimestamp());
                    return dangerAreaRepository.save(dangerArea);
                }).orElse(null);
    }
    

    public void deleteDangerArea(Long id) {
        dangerAreaRepository.deleteById(id);
    }
}
