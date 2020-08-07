import { Component, OnInit } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {OrderService} from "../../services/order.service";
import {Router} from "@angular/router";
import {NgxSpinnerService} from "ngx-spinner";
import {CartModelServer} from "../../models/cart.model";
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {AuthenticationService} from "../../services/authentication.service";

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
  userId: number;



  constructor(private cartService: CartService,
              private orderService: OrderService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private authService: AuthenticationService
              ) { }

  ngOnInit(): void {
    this.cartService.cartData$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

    if(this.authService.isLoggedIn()) {
      const user = this.authService.getUserDetails()
      this.userId = user.id;
      this.fname = user.first_name;
      this.lname = user.last_name;
      this.userEmail = user.email;
      this.userPhone = user.phone;
    }
    else{this.userId = 1}




  }

  get f(){
    return this.form.controls;
  }



  submit() {

    this.spinner.show().then(p => {
      this.cartService.CheckoutFromCart(this.userId, this.fname, this.lname, this.country,this.street,this.postcode,this.city,this.userEmail, this.userPhone, this.userMessage); //add userId
    });

    console.log(this.city);
  }


}


