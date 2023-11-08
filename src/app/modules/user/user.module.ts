import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserProfileComponent} from './pages/user-profile/user-profile.component';
import {UiModule} from "@app/core/ui/ui.module";
import {UserRoutingModule} from "@app/modules/user/user-routing.module";
import {UserService} from "@app/core/service/user/user.service";
import {HttpClientModule} from "@angular/common/http";
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import { ValidationComponent } from './pages/validation/validation.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    ValidationComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    UserRoutingModule,
    HttpClientModule
  ],
  providers: [UserService, ToastService]
})
export class UserModule {
}
