import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ParamMap, Router} from "@angular/router";
import {Product, ProductModelServer, ProductServerResponse} from "../../models/product.model";
import {CartService} from "../../services/cart.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {CategoryModelServer, CategoryServerResponse} from "../../models/category.model";
import {CategoryService} from "../../services/category.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: ProductModelServer[] = [];
  categories: CategoryModelServer[] = [];
  itemSorted: ProductModelServer[] =[];
  items: ProductModelServer[] = [];

  constructor(private productService: ProductService,private categoryService: CategoryService, private cartService: CartService ,private router: Router, private http: HttpClient) { }

  ngOnInit(): void {

    this.loadProducts();

    this.categoryService.getAllCategories().subscribe((cats: CategoryServerResponse) => {
      this.categories = cats.category;
      console.log(this.categories);

    });



  }

  loadProducts()
  {
    this.productService.getAllProducts(window.localStorage.getItem('language')).subscribe((prods: ProductServerResponse) => {
      this.products = prods.products.reverse();
      this.items = prods.products.reverse();

      console.log(this.products);
    });
  }



  sortMinProducts()
  {
  this.products.sort(function(a,b){
    return Number(a.price)>Number(b.price)?1:Number(a.price) <Number(b.price)?-1:0
  })
  }

  sortMaxProducts()
  {
    this.products.sort(function(a,b){
      return Number(a.price)>Number(b.price)?1:Number(a.price) <Number(b.price)?-1:0
    }).reverse();
  }

  filterBySize(size: string)
  {

    this.itemSorted = this.items.filter(function (el)
      {
        switch (size) {
          case 'XS':
          {
            return el.xs > 0;

          }
              break;
          case 'S':
            return el.s>0;
            break;
          case 'M':
            return el.m>0;
            break;
          case 'L':
            return el.l>0;
            break;
          case 'XL':
            return el.xl>0;
            break;
          case 'XXL':
            return el.xxl>0;
            break;

        }

      })

    this.products = this.itemSorted;
    console.log(this.products);

  }


  selectProduct(id: number) {
    this.router.navigate(['/product',id]).then();
  }

  AddToCart(id: number, size:string) {
    this.cartService.addProductToCart(id, 1,size);
  }
}
