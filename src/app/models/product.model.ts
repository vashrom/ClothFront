import {SizeModelServer} from "./size.model";


export interface ProductModelServer {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  images: string;
  size: string;
  color: string;


}

export interface ServerResponse {

  count: number;
  products: ProductModelServer[];

}
