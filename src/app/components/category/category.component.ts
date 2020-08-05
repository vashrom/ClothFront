import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductModelServer, ServerResponse} from "../../models/product.model";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  catName: string;
  products: ProductModelServer[] = [];
  private SERVER_URL = environment.SERVER_URL;


  constructor(private productService: ProductService, private cartService: CartService ,private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.catName;
      })
    ).subscribe(catName =>{
      this.catName = catName;
      this.http.get<ProductModelServer[]>(this.SERVER_URL + '/products/'+window.localStorage.getItem('language')+'/category/'+catName).subscribe(prods=>{
        this.products = prods;
      });
    });
      // .subscribe(catName => {
      // this.catName = catName;
      // this.productService.getProductsFromCategory(this.catName).subscribe(prods => {
      //   this.products = prods;

      // });
    // });
  }

// .subscribe(prodId => {
//   this.id = prodId;
//
//   this.http.get<ProductModelServer>(this.SERVER_URL + '/products/'+window.localStorage.getItem('language')+'/'+this.id,{
// }).subscribe(prod =>{
//   this.product = prod;
//   if(prod.images !== null){
//     this.thumbImages = prod.images.split(';');
//   }
// })

  selectProduct(id: number) {
    this.router.navigate(['/product',id]).then();
  }

  AddToCart(id: number) {
    this.cartService.addProductToCart(id);
  }
}
