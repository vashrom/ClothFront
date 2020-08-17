export interface BlogModelServer {
  id: number;
  title: string;
  title_ua: string;
  title_ru: string;
  title_de: string;
  image: string;
  images: string;
  text: string;
  text_ua: string;
  text_ru: string;
  text_de: string;
  category: string;
  category_ua: string;
  category_ru: string;
  category_de: string;
  date: string;



}

export interface BlogServerResponse {

  blog: BlogModelServer[];

}

export class Blog{
  constructor(
    public id: number,
    public title: string,
    public title_ua: string,
    public title_ru: string,
    public title_de: string,

    public image: string,
    public images: string,
    public text: string,
    public text_ua: string,
    public text_ru: string,
    public text_de: string,

    public category: string,
    public category_ua: string,
    public category_ru: string,
    public category_de: string,

    public date: string



  ) {
  }
}
