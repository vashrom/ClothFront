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
import {CollectionModelServer, CollectionServerResponse} from "../../models/collection.model";
import {CollectionService} from "../../services/collection.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  catName: string;
  products: ProductModelServer[] = [];
  categories: CategoryModelServer[] = [];
  collections: CollectionModelServer[] = [];
  itemSorted: ProductModelServer[] =[];
  items: ProductModelServer[] = [];

  private SERVER_URL = environment.SERVER_URL;


  constructor(private collectionService: CollectionService,private categoryService: CategoryService,private productService: ProductService, private cartService: CartService ,private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.catName;
      })
    ).subscribe(catName =>{
      this.catName = catName;
      this.http.get<ProductModelServer[]>(this.SERVER_URL + '/products/'+window.localStorage.getItem('language')+'/category/'+catName).subscribe(prods=>{
        this.products = prods.reverse();
        this.items = prods.reverse();
      });
    });

    this.categoryService.getAllCategories().subscribe((cats: CategoryServerResponse) => {
      this.categories = cats.category;
      console.log(this.categories);

    });
    this.collectionService.getAllCollections().subscribe((coll:CollectionServerResponse)=>{
      this.collections = coll.collection;
    })

  }

  selectProduct(id: number) {
    this.router.navigate(['/product',id]).then();
  }

  AddToCart(id: number, size:string) {
    this.cartService.addProductToCart(id, 1,size);
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


}
