import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "@app/modules/admin/pages/dashboard/dashboard.component";
import {AdminProfileComponent} from "@app/modules/admin/pages/admin-profile/admin-profile.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'profile',
    component: AdminProfileComponent
  },
  {
    path: 'person/:id',
    component: AdminProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
