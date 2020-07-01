import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "./product.service";
import {OrderService} from "./order.service";
import {environment} from "../../environments/environment";
import {CartModelPublic, CartModelServer} from "../models/cart.model";
import {BehaviorSubject} from "rxjs";
import {NavigationExtras, Router} from "@angular/router";
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


  addProductToCart(id: number, quantity ?: number)
  {
    this.productService.getSingleProduct(id).subscribe(prod=>{
      //Cart is empty
      if(this.cartDataServer.data[0].product == undefined)
      {
        this.cartDataServer.data[0].product = prod;
        this.cartDataServer.data[0].numInCart = quantity != undefined ? quantity : 1;
        //TODO Calculate total amount
        this.cartDataClient.prodData[0].incart=this.cartDataServer.data[0].numInCart;
        this.cartDataClient.prodData[0].id = prod.id;
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
        this.cartData$.next({... this.cartDataServer});
        //TODO Display toast notification


      }
      //Cart has some items
      else {
        let index = this.cartDataServer.data.findIndex(p => p.product.id == prod.id);

        if(index != -1){
          if(quantity != undefined && quantity <= prod.quantity){
            this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quantity ? quantity : prod.quantity;
          }
          else {
            this.cartDataServer.data[index].numInCart = this.cartDataServer.data[index].numInCart < prod.quantity ? this.cartDataServer.data[index].numInCart++ : prod.quantity;
          }

          this.cartDataClient.prodData[index].incart = this.cartDataServer.data[index].numInCart;
          //TODO Display toast notification
        } //endofif

        //if item not in cart
        else {
          this.cartDataServer.data.push({
            numInCart:1,
            product: prod
          });

          this.cartDataClient.prodData.push({
            incart: 1,
            id: prod.id
          });


          //TODO Display toast notification

          //TODO Calculate total amount
          this.cartDataClient.total = this.cartDataServer.total;
          localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
          this.cartData$.next({... this.cartDataServer});
        } // endofelse
      }
    });
  }

  UpdateCartItems(index: number, increase: boolean)
  {
    let data = this.cartDataServer.data[index];

    if(increase) {
      data.numInCart < data.product.quantity ? data.numInCart++ : data.product.quantity;
      this.cartDataClient.prodData[index].incart = data.numInCart;
      //TODO Calculate total amount
      this.cartDataClient.total = this.cartDataServer.total;
      localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      this.cartData$.next({... this.cartDataServer});

    } else {
      data.numInCart--;

      if(data.numInCart < 1) {
        //TODO DELETE PRODUCT FROM CART
        this.cartData$.next({...this.cartDataServer});
      }
      else {
        this.cartData$.next({...this.cartDataServer});
        this.cartDataClient.prodData[index].incart = data.numInCart;
        //TODO Calculate total amount
        this.cartDataClient.total = this.cartDataServer.total;
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
    }
  }

  DeleteProductFromCart(index: number){
    if(window.confirm('Are you sure want to remove the item?'))
    {
      this.cartDataServer.data.splice(index, 1);
      this.cartDataClient.prodData.splice(index, 1);
      //TODO Calculate total amount
      this.cartDataClient.total = this.cartDataServer.total;


      if(this.cartDataClient.total ==0){
        this.cartDataClient = {total: 0, prodData: [{incart: 0, id: 0}]};
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }
      else
      {
        localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
      }

      if(this.cartDataServer.total == 0) {
        this.cartDataServer = {total: 0, data:[{numInCart: 0, product: undefined}]};
        this.cartData$.next({...this.cartDataServer});
      }

      else
      {
        this.cartData$.next({...this.cartDataServer});
      }

    }
    else
    {
      //if user choose cancel button
      return;
    }
  }

  private CalculateTotal() {
    let Total = 0;

    this.cartDataServer.data.forEach(p => {
      const {numInCart} = p;
      const {price} = p.product;

      Total += numInCart * price;
    });
    this.cartDataServer.total = Total;
    this.cartTotal$.next(this.cartDataServer.total);
  }

  CheckoutFromCart(userId: number) {
    this.http.post(`${this.serverURL}/orders/payment`, null).subscribe((res:{success: boolean}) => {
      if(res.success)
      {
        this.resetServerData();
        this.http.post(`${this.serverURL}/orders/new`, {
          userId: userId,
          products: this.cartDataClient.prodData
        }).subscribe((data: OrderResponse) => {

          this.orderService.getSingleOrder(data.order_id).then(prods => {
            if(data.success) {

              const navigationExtras: NavigationExtras = {
                state: {
                  message: data.message,
                  products: prods,
                  orderId: data.order_id,
                  total: this.cartDataClient.total
                }
              };

              this.router.navigate(['/thankyou'],navigationExtras).then(p => {
                this.cartDataClient = {total: 0, prodData: [{incart: 0, id: 0}] };
                this.cartTotal$.next(0);
                localStorage.setItem('cart', JSON.stringify(this.cartDataClient));
              });
            }
          });

        });

      }
    });
  }

  private resetServerData() {
    this.cartDataServer = {
      total: 0,
      data: [{
        numInCart: 0,
        product: undefined
      }]
    };



    this.cartData$.next({...this.cartDataServer});
  }

}

interface OrderResponse {
  order_id: number;
  success: boolean;
  message: string;
  products: [{
    id: string,
    numInCart: string
  }];
}
