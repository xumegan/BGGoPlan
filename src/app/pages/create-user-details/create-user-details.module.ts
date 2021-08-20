import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateUserDetailsPageRoutingModule } from './create-user-details-routing.module';

import { CreateUserDetailsPage } from './create-user-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateUserDetailsPageRoutingModule
  ],
  declarations: [CreateUserDetailsPage]
})
export class CreateUserDetailsPageModule {}
