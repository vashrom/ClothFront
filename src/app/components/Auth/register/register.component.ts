import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload} from "../../../services/authentication.service";
import { Router } from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent{


  form = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lname: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(6)]),
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

  constructor(private auth: AuthenticationService, private router: Router) { }



  get f(){
    return this.form.controls;
  }

  submit(){
    this.auth.register(this.credentials).subscribe(
      ()=> {
        this.router.navigateByUrl('/')
      },
      err => {
        console.error(err)
      }
    )
  }

}
