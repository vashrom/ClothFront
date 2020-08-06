export interface UserModelServer {
  id: number;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  role: number;
  created: string;
  phone: string;



}

export interface UserServerResponse {

  users: UserModelServer[];

}

export class User{
  constructor(
   public id: number,
   public password: string,
   public email: string,
   public first_name: string,
   public last_name: string,
   public role: number,
   public created: string,
   public phone: string



  ) {
  }
}
