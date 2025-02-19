import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


  baseUrl: string = environment.baseUrl;
  frontEndUrl: string = environment.frontEndUrl;
  
  userToken: string = localStorage.getItem('userToken') as string;

  constructor(private http: HttpClient, private authService: AuthService) { }

  onlinePayment(cartId: string, formData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${this.frontEndUrl}`,
      {
        "shippingAddress": formData
      },
      {
        headers: {
          token: this.userToken
        }
      }
    );
  }

  getUserOrders() {
    this.authService.decodeToken();
    // this.authService.userData.id;
    return this.http.get(`${this.baseUrl}/api/v1/orders/user/${this.authService.userData.id}`);
  }

}
