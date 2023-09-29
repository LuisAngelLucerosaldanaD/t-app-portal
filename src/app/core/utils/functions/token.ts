import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenData} from "@app/core/models/token";

const helper: JwtHelperService = new JwtHelperService();

export const GetTokenMetadata = (token: string): TokenData | null => {
  if (token) return helper.decodeToken<TokenData>(token);
  return null;
}

export const IsTokenExpired = (token: string): boolean => {
  if (token) return helper.isTokenExpired(token);

  return true;
}

export const GetTokenExpirationDate = (token: string): Date | null => {
  let expirationDate: Date | null = null;
  if (token) {
    expirationDate = helper.getTokenExpirationDate(token);
  }
  return expirationDate;
}
