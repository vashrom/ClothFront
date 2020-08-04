export interface CommentModelServer {
  id: number;
  name: string;
  email: string;
  text: string;
  cat_id: number;
  category: string;



}

export interface CommentServerResponse {

  comments: CommentModelServer[];

}

export class Comment{
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public text: string,
    public cat_id: number,
    public category: string


  ) {
  }
}
