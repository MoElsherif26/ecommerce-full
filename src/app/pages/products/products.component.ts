import { CartService } from './../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/interfaces/product';
import { ProductsService } from '../../core/services/products.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {


  productList: Product[] = [];

  constructor(private products: ProductsService, private cartService: CartService) { }


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.products.getProducts().subscribe(
      {
        next: (res) => {
          this.productList = res.data;
        },
        error: (error) => {
          // console.log(error);
        }
      }
    );
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId).subscribe({
      next: (res) => {

      },
      error: (err) => {
        
      }
    });
  }

}
