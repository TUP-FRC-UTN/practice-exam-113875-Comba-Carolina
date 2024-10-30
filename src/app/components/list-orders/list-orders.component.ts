import { Component, inject, OnInit } from '@angular/core';
import { Orden } from '../../models/orden';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css'
})
export class ListOrdersComponent implements OnInit{
  
  orders: Orden[] = [];
  private orderService = inject(OrdersService);

  ngOnInit(): void {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
    })
  }
}