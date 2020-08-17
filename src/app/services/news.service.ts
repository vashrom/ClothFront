
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {News, NewsModelServer, NewsServerResponse} from "../models/news.model";
import {CommentModelServer} from "../models/comment.model";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }


  getAllEmails(): Observable<NewsServerResponse>{
    return this.http.get<NewsServerResponse>(this.SERVER_URL + '/news', {

    });
  }


  sendEmail(email: string,):Observable<NewsModelServer> {
    {
      const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
      return this.http.post<NewsModelServer>(`${this.SERVER_URL}/news/new`, {
        email: email,
      })
    }
  }

  deleteEmail(id: number){
    return this.http.delete(this.SERVER_URL + '/news/' + id);
  }

}
