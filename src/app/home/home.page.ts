import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
//import { Router } from '@angular/router';
//import {User} from '../model/model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //user: User; should working on it later
  users:Observable<any>;
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
    this.users = this.firedatabase.list('users', ref =>
    ref.orderByChild("id").limitToLast(5)).valueChanges();
  }
  

    
     
  
  
}
