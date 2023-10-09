/**
 * Clave que nos provee de las variables de entorno del sistema
 */
export class EnvService {
  public REST_API: string = '';
  public BLION_API_AUTH: string = '';
  public GOOGLE_RECAPTCHA_SITEKEY: string = '';

  public enableDebug = true;
}
