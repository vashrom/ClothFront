import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Product, ProductModelServer, ServerResponse} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router) { }


  /*GET ALL PRODUCTS FROM SERVER*/
  getAllProducts(): Observable<ServerResponse>{
    return this.http.get<ServerResponse>(this.SERVER_URL + '/products', {

    });
  }

  /*GET SINGLE PRODUCT FROM SERVER*/
  getSingleProduct(id: number): Observable<ProductModelServer>{
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/products/' + id);
  }

  /*GET PRODUCT FROM ONE CATEGORY*/
  getProductsFromCategory(catName: string) : Observable<ProductModelServer[]>
{
  return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/products/category/'+catName);
}

/* CREATE PRODUCT FROM SERVER */
  createProduct(product: Product)
  {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.SERVER_URL + '/products/new', JSON.stringify(product),{headers:myHeaders});
  }

  updateProduct(id: number, prod: Product) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.SERVER_URL + '/products/' + id, JSON.stringify(prod), {headers:myHeaders});
  }
  deleteProduct(id: number){
    return this.http.delete(this.SERVER_URL + '/products/' + id);
  }


}
