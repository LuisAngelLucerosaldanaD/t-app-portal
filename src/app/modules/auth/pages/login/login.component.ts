import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {GetTokenMetadata} from "@app/core/utils/functions/token";
import {Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EnvServiceFactory} from "@app/core/service/env/env.service.provider";
import {UserService} from "@app/core/service/user/user.service";
import {Subscription} from "rxjs";
import {Login} from "@app/core/models/token";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private _subscriptions: Subscription = new Subscription();
  public isBlockPage: boolean = false;
  private token: string = '';
  public siteKey: string = '';
  public formLogin: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _messageService: ToastService,
    private _userService: UserService,
    private _router: Router
  ) {
    this.siteKey = EnvServiceFactory().GOOGLE_RECAPTCHA_SITEKEY;
    this.formLogin = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      recaptcha: ['', this.siteKey !== '' ? Validators.required : []]
    });
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  ngOnInit(): void {
  }

  /**
   * Método que devuelve la instancia del campo email del grupo del formulario como un control individual pero
   * vinculado al grupo de formulario principal
   */
  get emailField(): AbstractControl {
    return <AbstractControl>this.formLogin.get('email');
  }

  /**
   * Método que devuelve la instancia del campo password del grupo del formulario como un control individual pero
   * vinculado al grupo de formulario principal
   */
  get passwordField(): AbstractControl {
    return <AbstractControl>this.formLogin.get('password');
  }

  /**
   * Método que devuelve la instancia del campo recaptcha del grupo del formulario como un control individual pero
   * vinculado al grupo de formulario principal
   */
  get captchaField(): AbstractControl {
    return <AbstractControl>this.formLogin.get('recaptcha');
  }

  /**
   * Método que permite iniciar sesión por correo y contraseña
   */
  public login(): void {

    if (this.captchaField.invalid) {
      this._messageService.add({type: 'warning', message: 'El código captcha es requerido'});
      this.formLogin.markAllAsTouched();
      return;
    }

    if (this.formLogin.invalid) {
      this._messageService.add({type: 'warning', message: 'Rellene todos los datos de sesión correctamente'});
      this.formLogin.markAllAsTouched();
      return;
    }

    this.isBlockPage = true;
    const dataLogin: Login = {
      email: this.emailField.value,
      password: this.passwordField.value
    }
    this._subscriptions.add(
      this._userService.login(dataLogin).subscribe({
        next: (res) => {
          if (res.error) {
            this._messageService.add({type: 'error', message: res.msg});
            return;
          }
          this.token = res.data.access_token;
          sessionStorage.setItem('access_token', res.data.access_token);
          sessionStorage.setItem('refresh_token', res.data.refresh_token);
          this.validatePermissions();
        },
        error: (err: HttpErrorResponse) => {
          this._messageService.add({type: 'error', message: 'No se pudo inciar sesión, intente nuevamente'});
          console.error(err);
          return;
        },
        complete: () => {
          this.isBlockPage = false;
        }
      })
    )
  }

  /**
   * Método que permite verificar el rol del usuario que ha iniciado sesión
   * @private
   */
  private validatePermissions() {
    const claims = GetTokenMetadata(this.token);
    if (claims && claims.rol && claims.rol === 'admin') {
      this._router.navigateByUrl('/admin/dashboard');
    } else {
      this._router.navigateByUrl('/user');
    }
  }

}
