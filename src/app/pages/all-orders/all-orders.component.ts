import { Order } from '../../core/interfaces/order';
import { OrdersService } from './../../core/services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  imports: [],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {


  orders: Order[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.getUserOrders().subscribe({
      next: (res) => {
        this.orders = res as Order[];
        console.log(res);
      }, 
      error: (err) => {
        // console.log(err);
      }
    })
  }



}
