import {JwtHelperService} from "@auth0/angular-jwt";
import {TokenData} from "@app/core/models/token";

/**
 * Variable que nos retorna una instancia del servicio JwtHelperService
 */
const helper: JwtHelperService = new JwtHelperService();

/**
 * Método que permite obtener los datos que vienen inscrutados en el token
 * @param {string} token
 */
export const GetTokenMetadata = (token: string): TokenData | null => {
  if (token) return helper.decodeToken<TokenData>(token);
  return null;
}

/**
 * Método que permite validar si un token ha caducado
 * @param {string} token
 */
export const IsTokenExpired = (token: string): boolean => {
  if (token) return helper.isTokenExpired(token);

  return true;
}

/**
 * Método que permite obtener la fehca de expiración del token
 * @param {string} token
 */
export const GetTokenExpirationDate = (token: string): Date | null => {
  let expirationDate: Date | null = null;
  if (token) {
    expirationDate = helper.getTokenExpirationDate(token);
  }
  return expirationDate;
}
