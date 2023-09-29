import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from "rxjs";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EnvServiceFactory} from "@app/core/service/env/env.service.provider";
import {UserService} from "@app/core/service/user/user.service";
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {CreateAccount} from "@app/core/models/user";
import {HttpErrorResponse} from "@angular/common/http";
import QRCodeStyling from "qr-code-styling";
import {GenerateQRCode} from "@app/core/utils/functions/canvas";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription = new Subscription();
  @ViewChild('qr') qrCodeRef!: ElementRef<HTMLCanvasElement>;
  public isBlockPage: boolean = false;
  public accountForm: FormGroup;
  public siteKey: string = '';
  public isCreated: boolean = false;
  public urlQR: string = '';

  constructor(
    private _fb: FormBuilder,
    private _messageService: ToastService,
    private _userService: UserService
  ) {
    this.siteKey = EnvServiceFactory().GOOGLE_RECAPTCHA_SITEKEY;
    this.accountForm = this._fb.group({
      document_number: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      recaptcha: ['', [Validators.required]],
      cellphone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(15)]]
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnInit(): void {
  }

  /**
   * Método que devuelve la instancia del campo recaptcha del grupo del formulario como un control individual pero
   * vinculado al grupo de formulario principal
   */
  get captchaField(): AbstractControl {
    return <AbstractControl>this.accountForm.get('recaptcha');
  }

  /**
   * Método que permite crear una cuenta en check id e incia el proceso de enrolamiento, despues genera un código QR
   * Con el link de onboarding generado desde el API
   */
  public createAccount(): void {
    if (this.captchaField.invalid) {
      this._messageService.add({type: 'warning', message: 'El código captcha es requerido'});
      this.accountForm.markAllAsTouched();
      return;
    }

    if (this.accountForm.invalid) {
      this._messageService.add({type: 'warning', message: 'Rellene todos los datos correctamente'});
      this.accountForm.markAllAsTouched();
      return;
    }

    const data: CreateAccount = {
      document_number: this.accountForm.get('document_number')?.value,
      email: this.accountForm.get('email')?.value,
      password: this.accountForm.get('password')?.value,
      cellphone: this.accountForm.get('cellphone')?.value,
    }


    this.isBlockPage = true;
    this._subscriptions.add(
      this._userService.createAccount(data).subscribe({
        next: (res) => {
          if (res.error || res.code !== 29) {
            this._messageService.add({type: 'error', message: res.msg});
            return;
          }
          this.isCreated = true;
          GenerateQRCode(res.data.url).then((res) => {
            if (res) this.urlQR = URL.createObjectURL(res);
          })
          return;
        },
        error: (err: HttpErrorResponse) => {
          this._messageService.add({type: 'error', message: 'No se pudo crear la cuenta, intente nuevamente'});
          console.error(err);
          return;
        },
        complete: () => {
          this.isBlockPage = false;
        }
      })
    );

  }

}
