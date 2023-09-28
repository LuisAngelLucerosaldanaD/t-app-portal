import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserStatus} from "@app/core/models/table";
import {DashboardService} from "@app/core/service/dashboard/dashboard.service";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {Work} from "@app/core/models/dashboard";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  protected work: Work[] = [];

  private _subscriptions: Subscription = new Subscription();

  protected blockPage: boolean = false;

  constructor(
    private _dashboardService: DashboardService,
    private _messageService: ToastService
  ) {
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllWork();
  }

  /**
   * Método que permite obtener el trabajo pendiente de los usuarios asigandos a un administrador
   * @protected
   */
  protected getAllWork(): void {
    this.blockPage = true;
    this._subscriptions.add(
      this._dashboardService.getAllWork().subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg});
            return;
          }

          this.work = [];

          if (!res.data || !res.data.length) {
            this._messageService.add({type: 'info', message: 'No hay trabajo reciente o pendiente'});
            return;
          }

          this.work = res.data;
          return;
        },
        error: (err: HttpErrorResponse) => {
          console.error(err);
          this._messageService.add({
            type: 'error',
            message: 'No se pudo consultar el trabajo actual, intente nuevamente'
          });
          return;
        },
        complete: () => {
          this.blockPage = false;
        }
      })
    );
  }

}
