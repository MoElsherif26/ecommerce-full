import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  isLoading: boolean = false;
  errorMessage: string = '';

  // prepare reactive form for register
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });


  constructor(private authService: AuthService, private router: Router) {}

  submit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm);
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          // navigate to login
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
          // display problem message
          this.errorMessage = err.error.message;
          
        }
      });
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

}
