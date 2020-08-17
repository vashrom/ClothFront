import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductModelServer, ProductServerResponse} from "../../models/product.model";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CategoryModelServer, CategoryServerResponse} from "../../models/category.model";
import {CategoryService} from "../../services/category.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  catName: string;
  products: ProductModelServer[] = [];
  categories: CategoryModelServer[] = [];

  private SERVER_URL = environment.SERVER_URL;


  constructor(private categoryService: CategoryService,private productService: ProductService, private cartService: CartService ,private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

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
