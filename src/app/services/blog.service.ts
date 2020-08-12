import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Blog, BlogModelServer, BlogServerResponse} from "../models/blog.model";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router) { }


  /*GET ALL BLOG ITEMS FROM SERVER*/
  getAllBlogItems(): Observable<BlogServerResponse>{
    return this.http.get<BlogServerResponse>(this.SERVER_URL + '/blog', {

    });
  }

  /*GET SINGLE BLOG ITEM FROM SERVER*/
  getSingleBlogItem(id: number): Observable<BlogModelServer>{
    return this.http.get<BlogModelServer>(this.SERVER_URL + '/blog/' + id);
  }

  /*PLACE FOR POST*/
  createBlog(blog: Blog)
  {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.SERVER_URL + '/blog/new', JSON.stringify(blog),{headers:myHeaders});
  }

  updateBlog(id: number, blog: Blog) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.SERVER_URL + '/blog/' + id, JSON.stringify(blog), {headers:myHeaders});
  }
  deleteBlog(id: number){
    return this.http.delete(this.SERVER_URL + '/blog/' + id);
  }

}
