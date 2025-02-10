import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  isLoading: boolean = false;
  errorMessage: string = '';

  // prepare reactive form for register
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl(null),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)])
  }, this.confirmPassword);

  constructor(private authService: AuthService, private router: Router) {}

  confirmPassword(form: AbstractControl) {
    let password = form.get('password')?.value;
    let rePassword = form.get('rePassword')?.value;
    if (password == rePassword) {
      return null;
    }
    else {
      return {misMatch: true}
    }
  }

  submit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm);
      this.isLoading = true;
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.isLoading = false;
          // navigate to login
          this.router.navigate(['/login']);
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
      this.registerForm.markAllAsTouched();
    }
  }



}
