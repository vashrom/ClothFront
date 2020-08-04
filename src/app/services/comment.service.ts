
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {CommentModelServer, CommentServerResponse} from "../models/comment.model";
import {Product, ProductModelServer} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router) { }




  getAllComments(): Observable<CommentServerResponse>{
    return this.http.get<CommentServerResponse>(this.SERVER_URL + '/comments', {

    });
  }

  getSingleComment(id: number): Observable<CommentModelServer>{
    return this.http.get<CommentModelServer>(this.SERVER_URL + '/comments/' + id);
  }

  postComment(  name: string, email: string, text: string, cat_id:number):Observable<CommentModelServer> {
    return this.http.post<CommentModelServer>(`${this.SERVER_URL}/comments/new`, {
      name: name,
      email: email,
      text: text,
      cat_id: cat_id
    })

  }

  getCommentsFromCategory(catName: string) : Observable<CommentModelServer[]>
  {
    return this.http.get<CommentModelServer[]>(this.SERVER_URL + '/comments/category/'+catName);
  }



  // updateProduct(id: number, prod: Product) {
  //   const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
  //   return this.http.put(this.SERVER_URL + '/products/' + id, JSON.stringify(prod), {headers:myHeaders});
  // }


  deleteComment(id: number){
    return this.http.delete(this.SERVER_URL + '/comments/' + id);
  }




}
