import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  getAllBrands(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/v1/brands`);
  }

}
