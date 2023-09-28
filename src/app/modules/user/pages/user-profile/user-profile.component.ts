import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {Subscription} from "rxjs";
import {UserService} from "@app/core/service/user/user.service";
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {User} from "@app/core/models/user";
import {Traceability} from "@app/core/models/tracking";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription = new Subscription();
  protected blockPage: boolean = false;
  protected user!: User;
  protected tracking: Traceability[] = [];

  constructor(
    private _userService: UserService,
    private _messageService: ToastService
  ) {
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getUserData();
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
              message: 'Usted aún esta pendiente de iniciar la validación de identidad'
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

  /**
   * Método que permite obtener los datos de un usuario
   * @private
   */
  private getUserData(): void {
    this.blockPage = true;
    this._subscriptions.add(
      this._userService.getUserData().subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg});
            return;
          }

          this.user = res.data;
          this.getUserTracking();
        },
        error: (err: HttpErrorResponse) => {
          this._messageService.add({type: 'error', message: 'No se pudo obtener los datos del usuario'});
          console.error(err);
          return;
        },
        complete: () => {
          this.blockPage = false;
        }
      })
    )
  }

}
