import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload} from "../../services/authentication.service";
import { Router } from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

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

  constructor(private auth: AuthenticationService, private router: Router) {}

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
      }
    )
  }

}
