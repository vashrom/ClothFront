export interface BlogModelServer {
  id: number;
  title: string;
  image: string;
  images: string;
  text: string;
  category: string;
  date: string;



}

export interface ServerResponse {

  blog: BlogModelServer[];

}

export class Blog{
  constructor(
    public id: number,
    public title: string,
    public image: string,
    public images: string,
    public text: string,
    public category: string,
    public date: string



  ) {
  }
}
