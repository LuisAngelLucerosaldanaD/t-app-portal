import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './pages/login/login.component';
import {ReactiveFormsModule} from "@angular/forms";
import {UiModule} from "@app/core/ui/ui.module";
import {RouterLink} from "@angular/router";
import {AuthRoutingModule} from "@app/modules/auth/auth-routing.module";
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {NgxCaptchaModule} from "ngx-captcha";
import {UserService} from "@app/core/service/user/user.service";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    UiModule,
    RouterLink,
    NgxCaptchaModule,
    HttpClientModule
  ],
  providers: [
    ToastService,
    UserService
  ]
})
export class AuthModule {
}
