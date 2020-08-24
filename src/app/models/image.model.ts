export interface ImageModelServer {
  id: number;
  slider1_1: string;
  slider1_2: string;
  slider2_1: string;
  slider2_2: string;
  slider3_1: string;
  slider3_2: string;
  cat_1: string;
  cat_2: string;
  cat_3: string;



}

export interface ImageServerResponse {

  images: ImageModelServer[];

}

export class Image{
  constructor(
    public id: number,
    public  slider1_1: string,
    public  slider1_2: string,
    public slider2_1: string,
    public slider2_2: string,
    public slider3_1: string,
    public slider3_2: string,
    public cat_1: string,
    public cat_2: string,
    public cat_3: string





  ) {
  }
}
