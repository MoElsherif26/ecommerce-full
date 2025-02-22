import { WishlistService } from './../../core/services/wishlist.service';
import { CartService } from './../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
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
    dots: true,
    navSpeed: 700,
    navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
    items: 1,
    nav: false,
    autoplay: true,  // Enable auto sliding
    autoplayTimeout: 1500, // Time in ms (3 seconds)
    autoplayHoverPause: true // Pause autoplay on mouse hover
  }

  // owl slider options
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
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
        items: 6
      }
    },
    nav: false,
    autoplay: true,  // Enable auto sliding
    autoplayTimeout: 1500, // Time in ms (3 seconds)
    autoplayHoverPause: true // Pause autoplay on mouse hover
  }

  constructor(private products: ProductsService, private categories: CategoriesService, private cartService: CartService, 
    private toastr: ToastrService, private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.products.getProducts().subscribe({
      next: (res) => {
        // Initialize each product with isWishlisted set to false.
        this.productList = res.data.map((p: Product) => ({ ...p, isWishlisted: false }));

        // Now fetch the user's wishlist from the server.
        this.wishlistService.getUserWishlist().subscribe({
          next: (wishlistRes) => {
            // extract the wishlist IDs.
            const wishlistIds: string[] = wishlistRes.data.map((item: any) => item.id);
            // Update each product if it's found in the wishlist.
            this.productList.forEach(product => {
              if (wishlistIds.includes(product.id)) {
                product.isWishlisted = true;
              }
            });
          },
          error: (err) => {
            // console.error('Error fetching wishlist', err);
          }
        });
      },
      error: (error) => {
        // console.error('Error fetching products', error);
      }
    });
  }

  getCategories() {
    this.categories.getCategories().subscribe(
      {
        next: (res) => {
          this.categoriesList = res.data;
        },
        error: (error) => {
        }
      }
    );
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        this.showSuccess(res.message);
      },
      error: (err) => {
        
      }
    });
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

  toggleWishlist(product: Product) {
    if (!product.isWishlisted) {
      // Add product to wishlist.
      this.wishlistService.addProductToWishlist(product.id).subscribe({
        next: (res) => {
          product.isWishlisted = true;
          this.showSuccess(res.message);
        },
        error: (err) => {
          console.error(err);
        }
      });
    } else {
      // Remove product from wishlist.
      this.wishlistService.removeProductFromWishlist(product.id).subscribe({
        next: (res) => {
          product.isWishlisted = false;
          this.showSuccess(res.message);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  



}
