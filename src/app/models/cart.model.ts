import {ProductModelServer} from "./product.model";


export interface CartModelServer {

  total: number;
  data: [{
    product: ProductModelServer,
    numInCart: number,
    size: string,
    color: string
  }];


}

export interface CartModelPublic {
   total: number,
  // fname: null;
  // lname: null;
  // country: null;
  // street: null;
  // postcode: null;
  // city: null;
  // email: null;
  // phone: null;
  prodData: [
    {
      id: number,
      incart: number,
      size: string,
      color: string
    }
  ];
}
