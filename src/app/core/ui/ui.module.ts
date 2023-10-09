import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastItemComponent} from './toast-item/toast-item.component';
import {BlockPageComponent} from "@app/core/ui/block-page/block-page.component";
import {ToastComponent} from "@app/core/ui/toast/toast.component";
import {CardChartComponent} from './card-chart/card-chart.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {TableComponent} from './table/table.component';
import {RouterLink} from "@angular/router";
import {ProfileComponent} from './profile/profile.component';
import {ActivityHistoryComponent} from './activity-history/activity-history.component';
import {FullScreenComponent} from './full-screen/full-screen.component';
import {QRCodeModule} from "angularx-qrcode";
import {LoaderComponent} from './loader/loader.component';


@NgModule({
  declarations: [
    ToastItemComponent,
    BlockPageComponent,
    ToastComponent,
    CardChartComponent,
    HeaderComponent,
    FooterComponent,
    TableComponent,
    ProfileComponent,
    ActivityHistoryComponent,
    FullScreenComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    QRCodeModule
  ],
  exports: [
    ToastItemComponent,
    BlockPageComponent,
    ToastComponent,
    CardChartComponent,
    FooterComponent,
    TableComponent,
    HeaderComponent,
    ProfileComponent
  ],
  providers: []
})
export class UiModule {
}
