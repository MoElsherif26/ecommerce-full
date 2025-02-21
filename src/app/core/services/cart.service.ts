import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  baseUrl: string = environment.baseUrl;
  private cartItems = new BehaviorSubject<number>(0);
  cartItemsCount = this.cartItems.asObservable();

  constructor(private http: HttpClient) { 
    this.loadCartItemCount();  // Load cart count on service initialization
  }

  private loadCartItemCount() {
    this.getCart().subscribe({
      next: (res) => this.cartItems.next(res.numOfCartItems || 0),
      error: () => this.cartItems.next(0)
    });
  }

  addToCart(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/cart`, { "productId": id }).pipe(
      tap(() => this.loadCartItemCount()) // Refresh count after adding
    );
  }

  getCart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/cart`);
  }

  deleteCart(): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/cart`).pipe(
      tap(() => this.cartItems.next(0)) // Reset count
    );
  }

  removeCartItem(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/cart/${id}`).pipe(
      tap(() => this.loadCartItemCount()) // Refresh count
    );
  }

  updateQuantity(id: string, count: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/cart/${id}`, { "count": count }).pipe(
      tap(() => this.loadCartItemCount()) // Refresh count
    );
  }
}
