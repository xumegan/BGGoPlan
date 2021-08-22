import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUserDetailsPage } from './create-user-details.page';

const routes: Routes = [
  {
    path: '',
    component: CreateUserDetailsPage
  },
  {
    path: ':userId',
    loadChildren: () => import('../edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUserDetailsPageRoutingModule {}
