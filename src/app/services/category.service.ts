import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Category, CategoryServerResponse} from "../models/category.model";
import {UserOrderServerResponse} from "../models/order.model";


@Injectable({
  providedIn: 'root'
})

export class CategoryService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router) { }


  /*GET ALL BLOG ITEMS FROM SERVER*/
  getAllCategories(): Observable<CategoryServerResponse>{
    if(window.localStorage.getItem('language')!='en') {
      return this.http.get<CategoryServerResponse>(this.SERVER_URL + '/category/'+window.localStorage.getItem('language'), {});
    }
    else {
      return this.http.get<CategoryServerResponse>(this.SERVER_URL + '/category', {});

    }
  }



  /*PLACE FOR POST*/
  createCategory(category: Category)
  {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.SERVER_URL + '/category/new', JSON.stringify(category),{headers:myHeaders});
  }

  updateCategory(id: number, category: Category) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.SERVER_URL + '/category/' + id, JSON.stringify(category), {headers:myHeaders});
  }
  deleteCategory(id: number){
    return this.http.delete(this.SERVER_URL + '/category/' + id);
  }

}
