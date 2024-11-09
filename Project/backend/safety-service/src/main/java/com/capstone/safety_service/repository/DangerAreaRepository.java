package com.capstone.safety_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.capstone.safety_service.models.DangerArea;

import java.util.List;

@Repository
public interface DangerAreaRepository extends JpaRepository<DangerArea, Long> {
    List<DangerArea> findByType(String type);
}