import { AuthService } from './../../core/services/auth.service';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  @Input() isLogin: boolean = true;

  constructor(private authService: AuthService) {

  }
  logout() {
    this.authService.logout();
  }

}
