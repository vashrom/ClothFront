import { Component, OnInit } from '@angular/core';
import {AuthenticationService, UserDetails} from "../../services/authentication.service";
import {
  OrderDetailsModelServer, OrderDetailsServerResponse,
  OrderModelServer,
  UserOrderModelServer,
  UserOrderServerResponse
} from "../../models/order.model";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userId: number;

  orders: UserOrderModelServer[] = [];


  constructor(private auth: AuthenticationService, private orderService: OrderService, private authService: AuthenticationService
  ) {}


  ngOnInit() {
    const user = this.authService.getUserDetails()
    this.userId = user.id;

   this.orderService.getUserOrders(this.userId).subscribe((ord: UserOrderServerResponse) => {
      this.orders = ord.orders.reverse();
      console.log(this.orders);

   });


  }


}
