import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {OrderService} from "../../services/order.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {CartModelServer} from "../../models/cart.model";
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  form = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    country: new FormControl('', [Validators.required, Validators.minLength(3)]),
    street: new FormControl('', [Validators.required, Validators.minLength(3)]),
    postcode: new FormControl('', [Validators.minLength(3), Validators.maxLength(10)]),
    city: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(3)]),
    message: new FormControl('', [Validators.minLength(3)]),

  });

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
  userMessage: string;



  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private spinner: NgxSpinnerService
              ) { }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

  }

  get f(){
    return this.form.controls;
  }

  // onCheckout() {
  //
  //   this.spinner.show().then(p => {
  //     this.cartService.CheckoutFromCart(2, this.fname, this.lname, this.country,this.street,this.postcode,this.city,this.userEmail, this.userPhone); //add userId
  //
  //   });
  //
  // }

  submit() {
    this.spinner.show().then(p => {
      this.cartService.CheckoutFromCart(30, this.fname, this.lname, this.country,this.street,this.postcode,this.city,this.userEmail, this.userPhone, this.userMessage); //add userId
    });

    console.log(this.city);
  }


}


