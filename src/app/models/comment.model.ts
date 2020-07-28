export interface CommentModelServer {
  id: number;
  name: string;
  email: string;
  text: string;
  cat_id: number;



}

export interface ServerResponse {

  comments: CommentModelServer[];

}
