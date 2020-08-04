import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {OrderDetailsModelServer, OrderDetailsServerResponse, OrderServerResponse} from "../models/order.model";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  ServerURL = environment.SERVER_URL;

  constructor(private http: HttpClient) {
  }

  getAllOrderDetails(): Observable<OrderDetailsServerResponse>{
    return this.http.get<OrderDetailsServerResponse>(this.ServerURL + '/orders', {

    });
  }

  getAllOrders(): Observable<OrderServerResponse>{
    return this.http.get<OrderServerResponse>(this.ServerURL + '/ordersinfo', {
    });
  }

  getSingleOrder(orderId: number) {
    return this.http.get<OrderDetailsServerResponse[]>(`${this.ServerURL}/orders/${orderId}`).toPromise();
  }

  getSingleOrderDetails(id: number):Observable<OrderDetailsServerResponse> {
    return this.http.get<OrderDetailsServerResponse>(this.ServerURL + '/orders/' + id);

  }

  deleteOrderReq(id: number){
    return this.http.delete(this.ServerURL + '/ordersinfo/' + id);
  }

  deleteOrderDetails(id: number){
    return this.http.delete(this.ServerURL + '/ordersinfo/od/' + id);
  }

}

