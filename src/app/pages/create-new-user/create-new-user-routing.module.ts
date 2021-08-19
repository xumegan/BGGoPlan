import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateNewUserPage } from './create-new-user.page';

const routes: Routes = [
  {
    path: '',
    component: CreateNewUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateNewUserPageRoutingModule {}
