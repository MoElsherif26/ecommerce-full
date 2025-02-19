import { CartService } from './../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe, JsonPipe, LowerCasePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { OnSalePipe } from '../../shared/pipes/on-sale.pipe';
import { TrimTextPipe } from '../../shared/pipes/trim-text.pipe';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  // imports: [CarouselModule, FormsModule, RouterLink, UpperCasePipe, LowerCasePipe, TitleCasePipe, SlicePipe, CurrencyPipe, DatePipe, JsonPipe, OnSalePipe, TrimTextPipe, SearchPipe],
  imports: [CarouselModule, FormsModule, RouterLink, TitleCasePipe, CurrencyPipe, SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  productList: Product[] = [];
  categoriesList: Category[] = [];
  currentDate = new Date();
  searchTerm: string = '';

  customMainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
    items: 1,
    nav: true
  }

  // owl slider options
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private products: ProductsService, private categories: CategoriesService, private cartService: CartService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.products.getProducts().subscribe(
      {
        next: (res) => {
          this.productList = res.data;
        },
        error: (error) => {
          // console.log(error);
        }
      }
    );
  }

  getCategories() {
    this.categories.getCategories().subscribe(
      {
        next: (res) => {
          this.categoriesList = res.data;
        },
        error: (error) => {
          // console.log(error);
        }
      }
    );
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {

      },
      error: (err) => {
        
      }
    });
  }


}
