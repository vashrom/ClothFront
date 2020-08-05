import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {ProductModelServer, ServerResponse} from "../../models/product.model";
import {CartService} from "../../services/cart.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: ProductModelServer[] = [];
  private SERVER_URL = environment.SERVER_URL;



  constructor(private productService: ProductService, private cartService: CartService ,private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    // this.productService.getAllProducts().subscribe((prods: ServerResponse) => {
    //   this.products = prods.products.reverse();
    //   console.log(this.products);
    // });
    this.http.get<ServerResponse>(this.SERVER_URL + '/products/'+window.localStorage.getItem('language'), {

    }).subscribe((prods: ServerResponse) => {
      this.products = prods.products.reverse();
      console.log(this.products);
    });

  }




  selectProduct(id: number) {
    this.router.navigate(['/product',id]).then();
  }

  AddToCart(id: number) {
    this.cartService.addProductToCart(id);
  }
}
