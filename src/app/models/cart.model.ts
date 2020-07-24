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
  total: number;
  prodData: [
    {
      id: number,
      incart: number,
      size: string,
      color: string
    }
  ];
}
