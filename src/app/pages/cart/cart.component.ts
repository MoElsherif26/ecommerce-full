import { CurrencyPipe } from '@angular/common';
import { Cart } from '../../core/interfaces/cart';
import { CartService } from './../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  cartId: string = "";
  cartData: Cart = {} as Cart;

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartService.getCart().subscribe({
      next: (res)=> {
        this.cartData = res.data
        this.cartId = res.cartId
      },
      error: (err)=> {
        
      }
    });
  }


  removeItem(productId: string) {
    this.cartService.removeCartItem(productId).subscribe({
      next: (res)=> {
        this.getCart();
      },
      error: (err)=> {
        
      }
    });
  }

  clearCart() {
    this.cartService.deleteCart().subscribe({
      next: (res)=> {
        this.cartData.products = [];
      },
      error: (err)=> {
        
      }
    });
  }

  updateQuantity(id: string, count: number) {
    this.cartService.updateQuantity(id, count).subscribe({
      next: (res)=> {
        this.cartData = res.data;
      },
      error: (err)=> {
        
      }
    });
  }

}
