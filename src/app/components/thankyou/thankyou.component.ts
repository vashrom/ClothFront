import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {OrderService} from "../../services/order.service";
import {ProductModelServer, ServerResponse} from "../../models/product.model";
import {Observable} from "rxjs";
import {CartModelServer} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
  message: string;
  orderId: number;
  products: ProductResponseModel[] = [];
  cartTotal: number;


  constructor(private router: Router,
              private orderService: OrderService) {
    const navigation = this.router.getCurrentNavigation();

    const state = navigation.extras.state as {
      message: string,
      products: ProductResponseModel[],
      orderId: number,
      total: number
    };

    this.message = state.message;
    this.products = state.products;
    this.orderId = state.orderId;
    this.cartTotal = state.total;
    console.log(navigation);

    console.log(state);



  }

  ngOnInit(): void {

  }

}

interface ProductResponseModel {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
  color: string;
}
