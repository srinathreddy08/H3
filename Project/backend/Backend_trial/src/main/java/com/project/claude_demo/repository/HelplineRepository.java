package com.project.claude_demo.repository;

import com.project.claude_demo.model.Helpline;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HelplineRepository extends JpaRepository<Helpline, Long> {}