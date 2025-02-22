import { CartService } from './../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/interfaces/product';
import { ProductsService } from '../../core/services/products.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink, FormsModule, SearchPipe],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  searchTerm: string = '';
  productList: Product[] = [];

  constructor(
    private products: ProductsService,
    private cartService: CartService,
    private toastr: ToastrService,
    private wishlistService: WishlistService
  ) { }

  ngOnInit(): void {
    this.getProducts();
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

  addToCart(productId: string) {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        this.showSuccess(res.message);
      },
      error: (err) => {
        console.error(err);
      }
    });
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

  showSuccess(message: string) {
    this.toastr.success(message);
  }
}
