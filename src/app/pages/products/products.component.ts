import { CartService } from './../../core/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/interfaces/product';
import { ProductsService } from '../../core/services/products.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-products',
  imports: [RouterLink, FormsModule, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  searchTerm: string = '';

  productList: Product[] = [];

  constructor(private products: ProductsService, private cartService: CartService, private toastr: ToastrService) { }


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
        this.showSuccess(res.message);
      },
      error: (err) => {
        
      }
    });
  }
  showSuccess(message: string) {
    this.toastr.success(message);
  }
}
