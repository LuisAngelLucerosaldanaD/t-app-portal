import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileComponent} from "@app/modules/user/pages/user-profile/user-profile.component";
import {ValidationComponent} from "@app/modules/user/pages/validation/validation.component";

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent
  },
  {
    path: 'validation',
    component: ValidationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class UserRoutingModule {
}
