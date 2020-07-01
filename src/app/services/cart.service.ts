import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "./product.service";
import {OrderService} from "./order.service";
import {environment} from "../../environments/environment";
import {CartModelPublic, CartModelServer} from "../models/cart.model";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {ProductModelServer} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private serverURL = environment.SERVER_URL;

  // Data var to store cart info on the client's local storage
  private cartDataClient: CartModelPublic = {
    total: 0,
    prodData: [{
      incart: 0,
      id: 0
    }]
  };

  //Data var to store cart info on the server
  private cartDataServer: CartModelServer = {
    total: 0,
    data: [{
      numInCart: 0,
      product: undefined
    }]
  };

  /* OBSERVABLES for components to subscribe */
  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<CartModelServer>(this.cartDataServer);




  constructor(private http: HttpClient, private productService: ProductService,
              private orderService: OrderService,
              private router: Router
              ) {

        this.cartTotal$.next(this.cartDataServer.total);
        this.cartData$.next(this.cartDataServer);

        // Get info from local storage

        let info = JSON.parse(localStorage.getItem('cart'));

        //Check if the info var is null or has sm data

        if(info != null && info != undefined && info.prodData[0].incart != 0)
        {
          //LS is not empty
          this.cartDataClient = info;

          //Put each entry into cartDataSerer obj
          this.cartDataClient.prodData.forEach(p=>{
            this.productService.getSingleProduct(p.id).subscribe((actualProductInfo: ProductModelServer) => {
              if(this.cartDataServer.data[0].numInCart == 0)
              {
                this.cartDataServer.data[0].numInCart = p.incart;
                this.cartDataServer.data[0].product = actualProductInfo;

                this.cartDataClient.total = this.cartDataServer.total;
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));

              }
              else {
                this.cartDataServer.data.push({
                  numInCart: p.incart,
                  product: actualProductInfo
                });

                this.cartDataClient.total = this.cartDataServer.total;
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              }

             this.cartData$.next({... this.cartDataServer});


            });
          });
        }


  }
}
