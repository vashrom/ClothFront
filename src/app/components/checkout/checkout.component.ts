import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {OrderService} from "../../services/order.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {CartModelServer} from "../../models/cart.model";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartTotal: number;
  cartData: CartModelServer;
  fname: string;
  lname: string;
  country: string;
  street: string;
  postcode: string;
  city: string;
  userEmail: string;
  userPhone: string;



  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private spinner: NgxSpinnerService
              ) { }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

  }

  onCheckout() {

    this.spinner.show().then(p => {
      this.cartService.CheckoutFromCart(2, this.fname, this.lname, this.country,this.street,this.postcode,this.city,this.userEmail, this.userPhone); //add userId
      console.log('piymavs')

    });



  }


}


