import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {
  OrderDetailsModelServer,
  OrderDetailsServerResponse,
  OrderServerResponse,
  UserOrderServerResponse
} from "../models/order.model";

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

  getUserOrders(id: number): Observable<UserOrderServerResponse>{


   if(window.localStorage.getItem('language')!='en') {
     return this.http.get<UserOrderServerResponse>(this.ServerURL + '/ordersinfo/'+window.localStorage.getItem('language')+'/user/' + id, {});
   }
   else {
     return this.http.get<UserOrderServerResponse>(this.ServerURL + '/ordersinfo/user/' + id, {});

   }
  }

  getAllOrders(): Observable<OrderServerResponse>{
    return this.http.get<OrderServerResponse>(this.ServerURL + '/ordersinfo', {
    });
  }

  getSingleOrder(orderId: number) {
    if(window.localStorage.getItem('language')!='en') {
      return this.http.get<OrderDetailsServerResponse[]>(`${this.ServerURL}/orders/${window.localStorage.getItem('language')}/${orderId}`).toPromise();
    }
    else
    {
      return this.http.get<OrderDetailsServerResponse[]>(`${this.ServerURL}/orders/en/${orderId}`).toPromise();
    }
    }


  getSingleOrderDetails(id: number):Observable<OrderDetailsServerResponse> {
    if(window.localStorage.getItem('language')!='en') {
      return this.http.get<OrderDetailsServerResponse>(this.ServerURL + '/orders/'+window.localStorage.getItem('language')+'/' + id);
    }
    else
    {
      return this.http.get<OrderDetailsServerResponse>(this.ServerURL + '/orders/en/' + id);
    }
  }

  deleteOrderReq(id: number){
    return this.http.delete(this.ServerURL + '/ordersinfo/' + id);
  }

  deleteOrderDetails(id: number){
    return this.http.delete(this.ServerURL + '/ordersinfo/od/' + id);
  }



}

