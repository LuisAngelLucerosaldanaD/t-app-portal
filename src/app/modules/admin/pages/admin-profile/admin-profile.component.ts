import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "@app/core/service/user/user.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {User} from "@app/core/models/user";
import {HttpErrorResponse} from "@angular/common/http";
import {Traceability} from "@app/core/models/tracking";

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription = new Subscription();
  protected userID: string = '';
  protected blockPage: boolean = false;
  protected user!: User;
  protected tracking: Traceability[] = [];

  constructor(
    private _userService: UserService,
    private _routerParam: ActivatedRoute,
    private _messageService: ToastService
  ) {
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getUrlParams();
    if (this.userID) {
      this.getUserData();
      return;
    }
  }

  /**
   * Método que permite obtener la información de un usuario por su identificador (id o número de documento)
   * @private
   */
  private getUserData(): void {
    this.blockPage = true;
    this._subscriptions.add(
      this._userService.getUserData().subscribe({
        next: (res) => {
          this.blockPage = false;
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg});
            return;
          }

          if (!res.data) {
            this._messageService.add({
              type: 'info',
              message: 'El usuario no esta registado en el sistema'
            });
            return;
          }

          this.getUserTracking();
          this.user = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this.blockPage = false;
          this._messageService.add({
            type: 'error',
            message: 'No se pudo obtener la información del usuario, intente nuevamente'
          });
        }
      })
    );
  }

  /**
   * Método que permite obtener el id del usuario que viene en la ruta {example_path/:id}
   * @private
   */
  private getUrlParams(): void {
    const routeParam = this._routerParam.snapshot.paramMap;
    const userId = routeParam.get('id');
    if (userId) this.userID = userId;
  }

  /**
   * Método que permite obtener la trazabilidad del proceso de enrolamiento de un usuario por su id
   * @private
   */
  private getUserTracking(): void {
    this.blockPage = true;
    this._subscriptions.add(
      this._userService.getTrackingUser().subscribe({
        next: (res) => {
          this.blockPage = false;
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg});
            return;
          }
          if (!res.data || !res.data.length) {
            this._messageService.add({
              type: 'info',
              message: 'El usuario esta pendiente de realizar el proceso de enrolamiento'
            });
            return;
          }
          this.tracking = res.data;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err)
          this.blockPage = false;
          this._messageService.add({
            type: 'error',
            message: 'No se pudo obtener la trazabilidad del proceso de enrolamiento'
          });
        }
      })
    );
  }

}
