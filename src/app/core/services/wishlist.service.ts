import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private wishListItems = new BehaviorSubject<number>(0);
  wishListCount = this.wishListItems.asObservable();

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { 
    this.loadWishListItemCount();  // Load wishList count on service initialization
  }
 
  private loadWishListItemCount() {
    this.getUserWishlist().subscribe({
      next: (res) => this.wishListItems.next(res.count || 0),
      error: () => this.wishListItems.next(0)
    });
  }

  getUserWishlist(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/wishlist`);
  }

  addProductToWishlist(productId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/wishlist`,
      {
        "productId": productId
      }
    ).pipe(
          tap(() => this.loadWishListItemCount()) // Refresh count after adding
        );
  }


  removeProductFromWishlist(prodcutId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/v1/wishlist/${prodcutId}`).pipe(
      tap(() => this.loadWishListItemCount()) // Refresh count after remove
    );
  }

}
