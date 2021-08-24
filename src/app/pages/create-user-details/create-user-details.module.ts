import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateUserDetailsPageRoutingModule } from './create-user-details-routing.module';

import { CreateUserDetailsPage } from './create-user-details.page';

@NgModule({
  imports: [
    CommonModule,
    //FormsModule,
    //ReactiveFormsModule,
    IonicModule,
    CreateUserDetailsPageRoutingModule
  ],
  declarations: [CreateUserDetailsPage]
})
export class CreateUserDetailsPageModule {}
