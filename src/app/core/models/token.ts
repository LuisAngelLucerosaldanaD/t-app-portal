import {User} from "@app/core/models/user";

export interface Login {
  email: string;
  password: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
}


export interface TokenData {
  exp: number;
  rol: string;
  user: User;
}
