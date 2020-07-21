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
