export interface NewsModelServer {
  id: number;
  email: string;

}

export interface NewsServerResponse {

  news: NewsModelServer[];

}

export class News{
  constructor(
    public id: number,
    public email: string,

  ) {
  }
}
