import { Component, OnInit } from '@angular/core';
import {CartModelServer} from "../../models/cart.model";
import {CartService} from "../../services/cart.service";
import {AuthenticationService} from "../../services/authentication.service";
import {TranslateService} from "@ngx-translate/core";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartData: CartModelServer;
  cartTotal: number;
  authState: boolean;
  selectedLang: string ='en';



  constructor(public cartService: CartService, public auth: AuthenticationService, public  translate: TranslateService) { }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    this.cartService.cartData$.subscribe(data=> this.cartData = data);
  }



  selectChangeHandler(event: any){
    this.selectedLang = event.target.value;
    this.translate.use(this.selectedLang)
console.log(this.selectedLang);
  }


}
