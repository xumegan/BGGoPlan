import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUserDetailsPage } from './create-user-details.page';

const routes: Routes = [
  {
    path: '',
    component: CreateUserDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUserDetailsPageRoutingModule {}
