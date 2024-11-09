import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { SlicePipe } from '@angular/common';
import { ArticlesService } from '../articles.service'; // Import the ArticlesService
import { Observable } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, SlicePipe, NavbarComponent],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articles: any[] = [];
  filteredArticles: any[] = [];
  selectedArticle: any = null; 
  isModalOpen: boolean = false; 

  constructor(private articlesService: ArticlesService) {} 

  ngOnInit(): void {
    this.fetchArticles();
  }

  fetchArticles(): void {
    this.articlesService.getArticles().subscribe((data) => {
      this.articles = data; 
      this.filteredArticles = this.articles; 
    });
  }

  filterArticles(category: string): void {
    this.filteredArticles =
      category === 'all'
        ? this.articles
        : this.articles.filter((article) => article.category === category);
  }

  openModal(article: any): void {
    this.selectedArticle = article; 
    this.isModalOpen = true; 
  }

  closeModal(): void {
    this.isModalOpen = false; 
  }
}
