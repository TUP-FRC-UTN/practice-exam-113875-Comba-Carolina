import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orden } from '../models/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private url: string = "http://localhost:3000/orders";
  private http = inject(HttpClient);
  constructor() { }

  getOrders():Observable<Orden[]> {
    return this.http.get<Orden[]>(this.url);
  }
}
