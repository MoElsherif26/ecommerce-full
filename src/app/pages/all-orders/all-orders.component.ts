import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { Order } from '../../core/interfaces/order';
import { OrdersService } from './../../core/services/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  imports: [CurrencyPipe, TitleCasePipe, DatePipe],
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
      }, 
      error: (err) => {
      }
    })
  }



}
