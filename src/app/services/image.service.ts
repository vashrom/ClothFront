import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Image, ImageServerResponse} from "../models/image.model";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router) { }


  /*GET ALL BLOG ITEMS FROM SERVER*/
  getAllImages(): Observable<ImageServerResponse>{
      return this.http.get<ImageServerResponse>(this.SERVER_URL + '/images', {});

  }

  /*PLACE FOR POST*/
  createImages(image: Image)
  {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.SERVER_URL + '/images/new', JSON.stringify(image),{headers:myHeaders});
  }

  updateImages(id: number, image: Image) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.SERVER_URL + '/images/' + id, JSON.stringify(image), {headers:myHeaders});
  }
  deleteImages(id: number){
    return this.http.delete(this.SERVER_URL + '/images/' + id);
  }

}
