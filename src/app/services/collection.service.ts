import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Collection, CollectionServerResponse} from "../models/collection.model";


@Injectable({
  providedIn: 'root'
})

export class CollectionService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient, private router: Router) { }


  /*GET ALL COLLECTION ITEMS FROM SERVER*/
  getAllCollections(): Observable<CollectionServerResponse>{
    if(window.localStorage.getItem('language')!='en') {
      return this.http.get<CollectionServerResponse>(this.SERVER_URL + '/collection/'+window.localStorage.getItem('language'), {});
    }
    else {
      return this.http.get<CollectionServerResponse>(this.SERVER_URL + '/collection', {});

    }
  }



  /*PLACE FOR POST*/
  createCollection(collection: Collection)
  {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.post(this.SERVER_URL + '/collection/new', JSON.stringify(collection),{headers:myHeaders});
  }

  updateCollection(id: number, collection: Collection) {
    const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this.http.put(this.SERVER_URL + '/collection/' + id, JSON.stringify(collection), {headers:myHeaders});
  }
  deleteCollection(id: number){
    return this.http.delete(this.SERVER_URL + '/collection/' + id);
  }

}
