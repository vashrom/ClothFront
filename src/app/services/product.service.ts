import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Product, ProductModelServer, ProductServerResponse} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router) { }


  /*GET ALL PRODUCTS FROM SERVER*/
  getAllProducts(lang: string): Observable<ProductServerResponse>{
    return this.http.get<ProductServerResponse>(this.SERVER_URL + '/products/'+lang, {

    });
  }



  /*GET SINGLE PRODUCT FROM SERVER*/
  getSingleProduct(id: number, lang: string): Observable<ProductModelServer>{
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/products/'+lang+'/' + id);
  }

  /*GET PRODUCT FROM ONE CATEGORY*/
  getProductsFromCategory(catName: string, lang: string) : Observable<ProductModelServer[]>
{
  return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/products/'+lang+'/category/'+catName);
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
