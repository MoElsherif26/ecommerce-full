import { WishlistService } from './../../core/services/wishlist.service';
import { CartService } from './../../core/services/cart.service';
import { AuthService } from './../../core/services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @Input() isLogin: boolean = true;
  cartCount: number = 0;
  wishListCount: number = 0;

  constructor(private authService: AuthService, private cartService: CartService, private wishlistService: WishlistService) {

  }
  ngOnInit() {
    this.cartService.cartItemsCount.subscribe(count => {
      this.cartCount = count;
    });

    this.wishlistService.wishListCount.subscribe(count => {
      this.wishListCount = count;
    });
  }
  logout() {
    this.authService.logout();
  }

}
