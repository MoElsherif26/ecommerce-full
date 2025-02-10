import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(form: any): Observable<any> {
    return this.http.post('https://ecommerce.routemisr.com/api/v1/auth/signup', form);
  }

  login(form: any): Observable<any> {
    return this.http.post('https://ecommerce.routemisr.com/api/v1/auth/signin', form);
  }

  

}
