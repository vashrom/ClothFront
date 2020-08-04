import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User, UserServerResponse} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router) { }


  /*GET ALL BLOG ITEMS FROM SERVER*/
  getAllUsers(): Observable<UserServerResponse>{
    return this.http.get<UserServerResponse>(this.SERVER_URL + '/users', {
    });
  }

  // /*GET SINGLE BLOG ITEM FROM SERVER*/
  // getSingleBlogItem(id: number): Observable<BlogModelServer>{
  //   return this.http.get<BlogModelServer>(this.SERVER_URL + '/blog/' + id);
  // }

  // /*PLACE FOR POST*/
  // createBlog(blog: Blog)
  // {
  //   const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
  //   return this.http.post(this.SERVER_URL + '/blog/new', JSON.stringify(blog),{headers:myHeaders});
  // }

  updateUser(id: number, user: User) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.SERVER_URL + '/users/' + id, JSON.stringify(user), {headers:myHeaders});
  }

  deleteUser(id: number){
    return this.http.delete(this.SERVER_URL + '/users/' + id);
  }

}
