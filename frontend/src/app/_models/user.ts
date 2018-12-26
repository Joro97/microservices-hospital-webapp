import { Role } from './Role';

export class User {
  user_name:String;
  scope:Array<String>;
  organization:String;
  exp: Number;
  authorities:Array<Role>;
  jti:String;
  client_id:String;
}
