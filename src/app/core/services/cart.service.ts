import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: string = environment.baseUrl;

  // userToken: string = localStorage.getItem('userToken') as string;

  constructor(private http: HttpClient) { }
 

  addToCart(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/cart`, 

      {
        "productId": id
      }
      // ,

      // {
      //   headers: {
      //     token: this.userToken
      //   }
      // }

    );
  }

  getCart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/cart`
    //   , {
    //   headers: {
    //     token: this.userToken
    //   }
    // }
  )
  }

  deleteCart(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/cart`
    //   , {
    //   headers: {
    //     token: this.userToken
    //   }
    // }
  )
  }

  

  removeCartItem(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/cart/${id}`
    //   , 
    //   {
    //   headers: {
    //     token: this.userToken
    //   }
    // }
  )

  }
  updateQuantity(id: string, count:number): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/cart/${id}`, 
      {
        "count": count
      }
    //   ,
    //   {
    //   headers: {
    //     token: this.userToken
    //   }
    // }
  )
  }

}
