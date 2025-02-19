import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = environment.baseUrl;
  userData: any;

  constructor(private http: HttpClient, private router: Router) { }

  register(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/auth/signup`, form);
  }

  login(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/auth/signin`, form);
  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
    this.userData = null;
  }

  decodeToken() {
    const token = localStorage.getItem('userToken') as string;
    this.userData = jwtDecode(token);

  }

  forgotPassword(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/auth/forgotPasswords`, form);
  }

  verifyResetCode(form: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/auth/verifyResetCode`, form);
  }

  resetPassword(form: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/v1/auth/resetPassword`, form);
  }

}
