import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  steps: number = 1;
  forgotPasswordErrorMessage: string = "";
  verifyResetCodeErrorMessage: string = "";
  resetPasswordErrorMessage: string = "";

  userEmail!: string;

  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });
  
  verifyResetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required])
  });

  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });
  
  constructor(private authService: AuthService, private router: Router) {}

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next: (res) => {
          // console.log(res);
          // Save the email for later steps
          this.userEmail = this.forgotPasswordForm.value.email;
          this.steps = 2;
        },
        error: (err) => {
          // console.log(err);
          this.forgotPasswordErrorMessage = err.error.message;
        }
      });
    } 
    else {
      this.forgotPasswordForm.markAllAsTouched();
    }
  }

  verifyResetCode() {
    if (this.verifyResetCodeForm.valid) {
      this.authService.verifyResetCode(this.verifyResetCodeForm.value).subscribe({
        next: (res) => {
          // console.log(res);
          // Patch the saved email into resetPasswordForm
          this.resetPasswordForm.patchValue({ email: this.userEmail });
          // Optionally disable the email field so it cannot be edited
          this.resetPasswordForm.get('email')?.disable();

          this.steps = 3;
        },
        error: (err) => {
          // console.log(err);
          this.verifyResetCodeErrorMessage = err.error.message;
        }
      });
    }
    else {
      this.verifyResetCodeForm.markAllAsTouched();
    }
    
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const formData = this.resetPasswordForm.getRawValue(); // Includes email
      this.authService.resetPassword(formData).subscribe({
        next: (res) => {
          // console.log(res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          // console.log(err);
          this.resetPasswordErrorMessage = err.error.message;
        }
      });




    }
    else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }


}
