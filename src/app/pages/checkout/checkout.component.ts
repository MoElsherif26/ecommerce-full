import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersService } from '../../core/services/orders.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  cartId: string = "";

  checkOutForm!: FormGroup;

  platformId = inject(PLATFORM_ID);

  constructor(private activatedRoute: ActivatedRoute, private orders: OrdersService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => {
      this.cartId = p.get('id') as string
    });

    this.checkOutForm = new FormGroup({
      details: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
      city: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });

  }

  submitForm() {
    if (this.checkOutForm.valid) {
      this.orders.onlinePayment(this.cartId, this.checkOutForm.value).subscribe({
        next: (res) => {
          if (isPlatformBrowser(this.platformId)) {
            window.open(res.session.url, "_self");
          }
        },
        error: (err) => {
        }
      });
    } 
    else {
      this.checkOutForm.markAllAsTouched();
    }
  }

}
