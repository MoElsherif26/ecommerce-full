import { CartService } from './../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {


  id:string = "";
  productData: Product = {} as Product;

  constructor(private activatedRoute: ActivatedRoute, private products: ProductsService, private cartService: CartService,
    private toastr: ToastrService
  ) {

  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        // console.log(p);
        this.id = p.get('id') as string;
        // console.log(this.id);
        this.getProductDetails();
      }


    });
  }

  getProductDetails() {
    this.products.getSpecificProduct(this.id).subscribe({
      next: (res) => {
        // console.log(res);
        this.productData = res.data;
      },
      error: (err) => {
        // console.log(err);
      }
    });
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {
        this.showSuccess(res.message);
      },
      error: (err) => {
        // console.log(err);
      }
    });
  }

  showSuccess(message: string) {
    this.toastr.success(message);
  }

}
