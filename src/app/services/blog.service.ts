import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {BlogModelServer, ServerResponse} from "../models/blog.model";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router) { }


  /*GET ALL BLOG ITEMS FROM SERVER*/
  getAllBlogItems(): Observable<ServerResponse>{
    return this.http.get<ServerResponse>(this.SERVER_URL + '/blog', {

    });
  }

  /*GET SINGLE BLOG ITEM FROM SERVER*/
  getSingleBlogItem(id: number): Observable<BlogModelServer>{
    return this.http.get<BlogModelServer>(this.SERVER_URL + '/blog/' + id);
  }

  /*PLACE FOR POST*/


}
