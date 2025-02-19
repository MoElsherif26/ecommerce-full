import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/products`);
  }

  getSpecificProduct(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/products/${id}`);
  }


}
