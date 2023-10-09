import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {User} from "@app/core/models/user";
import {GetFullSrcImg} from "@app/core/utils/validations/validations";
import {Router} from "@angular/router";
import {Traceability} from "@app/core/models/tracking";
import {UserService} from "@app/core/service/user/user.service";
import {Subscription} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {GenerateQRCode} from "@app/core/utils/functions/canvas";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy, OnChanges {

  @Input() user!: User;
  @Input() userID: string = '';
  @Input() tracking: Traceability[] = [];
  protected readonly GetFullSrcImg = GetFullSrcImg;
  private _subscription: Subscription = new Subscription();
  protected userSelfie: string = '';
  protected userDocumentFront: string = '';
  protected userDocumentBack: string = '';
  protected qrURL: string = '';

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _messageService: ToastService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['user'] && !changes['user'].firstChange) {
      this.initData();
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.initData();
  }

  /**
   * Método que inciar los valores que deben de ejecuartarse despues de hacer el renderizado del HTML
   * @private
   */
  private initData(): void {
    if (this.user.process_url) {
      GenerateQRCode(this.user.process_url, 200, 200).then((res) => {
        if (res) this.qrURL = URL.createObjectURL(res);
      });
    }
    this.getUserFiles();
  }

  /**
   * Método que permite obtener todos los archivo realacionados al usuario (foto de perfil, foto del documento de identidad)
   * @private
   */
  private getUserFiles(): void {
    if (this.user) {
      if (this.user.selfie_img) {
        this.getUserFile(this.user.selfie_img).then((res) => {
          if (typeof res.error === 'string') {
            this._messageService.add({type: 'error', message: res.error});
            return;
          }

          this.userSelfie = res.file;
          return;
        });
      }
      if (this.user.front_document_img) {
        this.getUserFile(this.user.front_document_img).then((res) => {
          if (typeof res.error === 'string') {
            this._messageService.add({type: 'error', message: res.error});
            return;
          }

          this.userDocumentFront = res.file;
          return;
        });
      }

      if (this.user.back_document_img) {
        this.getUserFile(this.user.back_document_img).then((res) => {
          if (typeof res.error === 'string') {
            this._messageService.add({type: 'error', message: res.error});
            return;
          }

          this.userDocumentBack = res.file;
          return;
        });
      }
    }
  }

  /**
   * Método que permite poder navegar a las rutas que permitiran validar ciertos criterios (selfie, documento de identidad e información básica)
   * @protected
   */
  protected navigateValidation(): void {
    if (this.user && !this.user.selfie_img) {
      this._router.navigateByUrl('/user/validation/selfie');
    } else if (this.user && !this.user.front_document_img) {
      this._router.navigateByUrl('/user/validation/document');
    } else if (this.user && !this.user.document_number) {
      this._router.navigateByUrl('/user/validation/information');
    } else {
      this._router.navigateByUrl('/user/validation/selfie');
    }
  }

  /**
   * Método que obtiene un archivo de un usuario mendiante el id del archivo y retorna una promesa con la esctrucuta { file: string, error: string | null }
   * @param {string} fileId id del archivo a obtener en formato UUID
   * @private
   */
  private getUserFile(fileId: string): Promise<{ file: string, error: string | null }> {
    return new Promise((resolve) => {
      this._subscription.add(
        this._userService.getUserFile(fileId).subscribe({
          next: (res) => {
            if (res.error) {
              resolve({
                file: '',
                error: res.msg
              })
              return;
            }

            resolve({
              file: res.data,
              error: null
            });
            return;
          },
          error: (err: HttpErrorResponse) => {
            console.error(err);
            resolve({
              file: '',
              error: 'No se pudo obtener el archivo del usuario, intente nuevamente'
            });
          }
        })
      );
    });
  }

}
