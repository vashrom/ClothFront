
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
  cat_id: number;
  short_desc: string;
  xs: number;
  s: number;
  m:number;
  l:number;
  xl: number;
  xxl: number;
  title_ua: string;
  title_ru: string;
  title_de: string;
  description_ua: string;
  description_ru: string;
  description_de: string;
  price_ua: number;
  price_ru: number;
  price_de: number;


  // color: string;


}

export interface ServerResponse {

  count: number;
  products: ProductModelServer[];


}

export class Product{
  constructor(
    public id: number,
    public title: string,
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
    public title_ua: string,
    public title_ru: string,
    public title_de: string,
    public description_ua: string,
    public description_ru: string,
    public description_de: string,
    public price_ua: number,
    public price_ru: number,
    public price_de: number,


  ) {
  }
}
