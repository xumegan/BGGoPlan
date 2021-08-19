import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
//import { Component,ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
//import { Content, Platform } from 'ionic-angular';
//import { Router } from '@angular/router';
import {User} from '../model/model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // user:User;
  users:Observable<any[]>;
  totalUsers:any;
  currentUser = null;
  currentIndex = -1;
  id:any;
  @Input() user: User;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  
  constructor(private firedatabase:AngularFireDatabase,) {
    this.users = this.firedatabase.list(`users`).valueChanges();
    this.users.subscribe(items => this.totalUsers = Object.keys(items).length)

  }

  viewUser(id) {
//
}  
setActiveUser(user:string, index:number): void{
this.currentUser = user
this.id =this.currentUser.key
  this.currentIndex = index;
}


  deleteUser(key:any){
    console.log(key)
    this.firedatabase.object(`users/${key}`).remove()
  }   
  
  
}
