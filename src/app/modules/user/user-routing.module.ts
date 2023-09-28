import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileComponent} from "@app/modules/user/pages/user-profile/user-profile.component";

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class UserRoutingModule {
}
