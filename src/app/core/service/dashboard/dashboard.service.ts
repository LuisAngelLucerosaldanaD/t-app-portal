import {Injectable} from '@angular/core';
import {EnvServiceFactory} from "@app/core/service/env/env.service.provider";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResAnny} from "@app/core/models/response";
import {Work} from "@app/core/models/dashboard";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private urlApiVersion: string = '/api/v1/';
  private urlAllWork: string = EnvServiceFactory().REST_API + this.urlApiVersion + 'work/all';

  constructor(
    private _httpService: HttpClient
  ) {
  }

  public getAllWork(): Observable<ResAnny<Work[]>> {
    return this._httpService.get<ResAnny<Work[]>>(this.urlAllWork).pipe((map => map));
  }

}
