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

  constructor(private authService: AuthService, private cartService: CartService) {

  }
  ngOnInit() {
    this.cartService.cartItemsCount.subscribe(count => {
      this.cartCount = count;
    });
  }
  logout() {
    this.authService.logout();
  }

}
