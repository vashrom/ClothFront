import { Component, OnInit } from '@angular/core';
import {CartModelServer} from "../../../models/cart.model";
import {CartService} from "../../../services/cart.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  subTotal: number;
  size: string;

  constructor(public cartService: CartService, private router: Router) { }

  ngOnInit(): void {

    this.cartService.cartData$.subscribe((data: CartModelServer) => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    console.log(this.cartData)
  }



  ChangeQuantity(index: number, increase: boolean) {
    this.cartService.UpdateCartItems(index, increase);
  }

  ClothSize(size: string) {
    this.size = size;

  }



}
