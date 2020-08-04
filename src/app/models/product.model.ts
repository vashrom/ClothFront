
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
  // color: string;
  cat_id: number;
  short_desc: string;

     xs: number;
     s: number;
     m:number;
     l:number;
     xl: number;
     xxl: number;



}

export interface ServerResponse {

  count: number;
  products: ProductModelServer[];


}

export class Product{
  constructor(
    public id: number,
    public  title: string,
    public category: string,
    public description: string,
    public price: number,
    public quantity: number,
    public image: string,
    public images: string,
    public size: string,
    public cat_id: number,
    public short_desc: string,
    public xs: number,
    public s: number,
    public m: number,
    public l: number,
    public xl: number,
    public xxl: number,


  ) {
  }
}
