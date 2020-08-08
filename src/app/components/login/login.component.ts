import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload} from "../../services/authentication.service";
import { Router } from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {FlashMessagesService} from "angular2-flash-messages";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


 statusMessage: string;


  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
    password: new FormControl('',[Validators.required, Validators.minLength(6)])
  });

  credentials: TokenPayload = {
    id:0,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: ''
  }

  constructor(private auth: AuthenticationService, private router: Router,private flashMessage: FlashMessagesService) {}

  get f(){
    return this.form.controls;
  }


  // login() {
  //
  // }

  submit(){
    this.auth.login(this.credentials).subscribe(
      ()=> {
        this.router.navigateByUrl('/')
      },
      err => {
        console.error(err)
        this.statusMessage = "Wrong login or password";
        this.flashMessage.show(this.statusMessage, { cssClass: 'alert-danger', timeout: 2000 });

      }
    )
  }

}
