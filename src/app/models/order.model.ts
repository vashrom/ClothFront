
export interface OrderDetailsModelServer {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string
}



export interface OrderDetailsServerResponse {

 orders: OrderDetailsModelServer[];

}

export class OrderDetails{
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public price: number,
    public image: string,
    public quantity: number,
    public size: string,
    public color: string,
  ) {
  }
}






export interface OrderServerResponse {

  orders: OrderModelServer[];

}


export class Order{
  constructor(
   public id: number,
   public user_id: number,
   public fname: string,
   public lname: number,
   public country: string,
   public street: number,
   public postcode: string,
   public city: string,
   public email: string,
   public phone: string,
   public message: string
  ) {
  }
}


export interface OrderModelServer {
  id: number;
  user_id: number;
  fname: string;
  lname: number;
  country: string;
  street: number;
  postcode: string;
  city: string;
  email: string;
  phone: string;
  message: string;

}
