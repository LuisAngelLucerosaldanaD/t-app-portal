import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from '@app/modules/admin/pages/dashboard/dashboard.component';
import {AdminRoutingModule} from "@app/modules/admin/admin-routing.module";
import {UiModule} from "@app/core/ui/ui.module";
import {AdminProfileComponent} from './pages/admin-profile/admin-profile.component';
import {ToastService} from "@app/core/ui/services/toast/toast.service";
import {UserService} from "@app/core/service/user/user.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "@app/core/service/interceptors/auth.interceptor";
import {DashboardService} from "@app/core/service/dashboard/dashboard.service";


@NgModule({
  declarations: [
    DashboardComponent,
    AdminProfileComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    UiModule,
    HttpClientModule
  ],
  providers: [
    ToastService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    DashboardService
  ]
})
export class AdminModule {
}
