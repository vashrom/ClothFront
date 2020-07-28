
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {CommentModelServer, ServerResponse} from "../models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router) { }




  getAllComments(): Observable<ServerResponse>{
    return this.http.get<ServerResponse>(this.SERVER_URL + '/comments', {

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




}
