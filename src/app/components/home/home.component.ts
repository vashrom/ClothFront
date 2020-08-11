import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Router} from "@angular/router";
import {ProductModelServer, ServerResponse} from "../../models/product.model";
import {CartService} from "../../services/cart.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CategoryModelServer, CategoryServerResponse} from "../../models/category.model";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: ProductModelServer[] = [];
  categories: CategoryModelServer[] = [];



  constructor(private productService: ProductService,private categoryService: CategoryService, private cartService: CartService ,private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.productService.getAllProducts(window.localStorage.getItem('language')).subscribe((prods: ServerResponse) => {
      this.products = prods.products.reverse();
      console.log(this.products);
    });

    this.categoryService.getAllCategories().subscribe((cats: CategoryServerResponse) => {
      this.categories = cats.category;
      console.log(this.categories);

    });


  }




  selectProduct(id: number) {
    this.router.navigate(['/product',id]).then();
  }

  AddToCart(id: number, size:string) {
    this.cartService.addProductToCart(id, 1,size);
  }
}
