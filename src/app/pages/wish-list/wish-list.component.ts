import { CartService } from './../../core/services/cart.service';
import { FormsModule } from '@angular/forms';
import { Product } from '../../core/interfaces/product';
import { WishlistService } from './../../core/services/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  imports: [FormsModule, RouterLink, SearchPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  searchTerm: string = '';
  wishListProducts: Product[] = [];
  constructor(private wishlistService: WishlistService, private cartService: CartService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getWishList();    
  }

  getWishList() {
    this.wishlistService.getUserWishlist().subscribe(
      {
        next: (res) => {
          this.wishListProducts = res.data;
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
        this.removeFromWishList(productId);
        this.getWishList();
      },
      error: (err) => {
        
      }
    });
  }

  removeFromWishList(productId: string) {
    this.wishlistService.removeProductFromWishlist(productId).subscribe({
      next: (res) => {
        this.getWishList();
        // this.wishListProducts = this.wishListProducts.filter(product => product.id !== productId);
      }
 
    });
  }

  showSuccess(message: string) {
    this.toastr.success(message); 
  }

}
