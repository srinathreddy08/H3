package com.project.claude_demo.repository;

import com.project.claude_demo.model.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
//    List<Article> findByCategory(String category);
}