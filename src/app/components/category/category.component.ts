import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {CartService} from "../../services/cart.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductModelServer, ServerResponse} from "../../models/product.model";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  catName: string;
  products: ProductModelServer[] = [];


  constructor(private productService: ProductService, private cartService: CartService ,private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((param: ParamMap) => {
        // @ts-ignore
        return param.params.catName;
      })
    ).subscribe(catName => {
      this.catName = catName;
      this.productService.getProductsFromCategory(this.catName).subscribe(prods => {
        this.products = prods;

      });
    });
  }

  selectProduct(id: number) {
    this.router.navigate(['/product',id]).then();
  }

  AddToCart(id: number) {
    this.cartService.addProductToCart(id);
  }
}
