import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

//import {User} from '../model/model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //user: User; should working on it later
  name:string;
  // key:string;will be the same key
  position:string;
  email:string;
  cell:string;
  type:string; 
  area:string;
  
  constructor(
    
    private firedatabase:AngularFireDatabase, 
  ) {
  
  }
  creatNewUser(){
    this.firedatabase.list('users').push({     
      date:Date(),
      id:`${Date.now()}`,
      name:this.name,
      // key: this.user.key,
      position: this.position,
      email: this.email,
      cell: this.cell,
      type:this.type, 
      area:this.area,
    });
      // this.user =;how to empty it
  }
}
