import { Component, OnInit } from '@angular/core';
import { Category } from '../../core/interfaces/category';
import { CategoriesService } from '../../core/services/categories.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [TitleCasePipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {


  allCategories: Category[] = [];

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.allCategories = res.data;
      }
    });
  }

}
