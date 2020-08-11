export interface CategoryModelServer {
  id: number;
  title: string;
  title_ua: string;
  title_ru: string;
  title_de: string;
  title_en: string;




}

export interface CategoryServerResponse {

  category: CategoryModelServer[];

}

export class Category{
  constructor(
    public id: number,
    public title: string,
    public title_ua: string,
    public title_ru: string,
    public title_de: string,
    public title_en: string




  ) {
  }
}
