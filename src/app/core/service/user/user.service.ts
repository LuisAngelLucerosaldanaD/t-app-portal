import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {EnvServiceFactory} from "@app/core/service/env/env.service.provider";
import {ResAnny} from "@app/core/models/response";
import {CreateAccount, ResponseOnboarding, User} from "@app/core/models/user";
import {Traceability} from "@app/core/models/tracking";
import {Login, Token} from "@app/core/models/token";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly urlApiVersion: string = '/api/v1/';
  private readonly urlUserData: string = EnvServiceFactory().REST_API + this.urlApiVersion + 'user';
  private readonly urlTrackingUser: string = EnvServiceFactory().REST_API + this.urlApiVersion + 'traceability/';
  private readonly urlUserFile: string = EnvServiceFactory().REST_API + this.urlApiVersion + 'user/file/';
  private readonly urlLogin: string = EnvServiceFactory().REST_API + '/api/v1/user/login';
  private readonly urlCreateAccount: string = EnvServiceFactory().REST_API + '/api/v1/user/register';

  constructor(
    private _httpService: HttpClient
  ) {
  }

  /**
   * Método que permite consultar la información de un usuario desde el servidor
   */
  public getUserData(): Observable<ResAnny<User>> {
    return this._httpService.get<ResAnny<User>>(this.urlUserData).pipe((map => map));
  }

  /**
   * Método que permite consultar la trazabilidad del proceso de enrolamiento de un usuario
   */
  public getTrackingUser(): Observable<ResAnny<Traceability[]>> {
    return this._httpService.get<ResAnny<Traceability[]>>(this.urlTrackingUser).pipe((map => map));
  }

  /**
   * Métood que permite obtener un archivo relacionado a un usuario por el id del archivo desde el gestor de archivos
   * @param fileId
   */
  public getUserFile(fileId: string): Observable<ResAnny<string>> {
    return this._httpService.get<ResAnny<string>>(this.urlUserFile + fileId).pipe((map => map));
  }

  /**
   * Método que permite iniciar sesión y obtener un token de autorización
   * @param data Datos a enviar qué pertenece al modelo Login
   */
  public login(data: Login): Observable<ResAnny<Token>> {
    return this._httpService.post<ResAnny<Token>>(this.urlLogin, data).pipe((map => map));
  }

  /**
   * Método que permite crear una cuenta de un usuario e inciar el proceso de onboarding
   * @param data Datos a enviar qué pertenece al modelo CreateAccount
   */
  public createAccount(data: CreateAccount): Observable<ResAnny<ResponseOnboarding>> {
    return this._httpService.post<ResAnny<ResponseOnboarding>>(this.urlCreateAccount, data).pipe((map => map));
  }

}
