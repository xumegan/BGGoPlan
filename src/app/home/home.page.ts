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
  userfilter:Observable<any[]>;
  
  totalUsers:any;
  currentUser = null;
  currentIndex = -1;
  id:any = '';
  key:string;
  styleOne: boolean = false;

  successDelete:string;
  errorDelete:string;

  filterbyarea:any[];
  filterbytype:any[];

  @Input() user: User;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  
  constructor(private firedatabase:AngularFireDatabase,) {
    this.users = this.firedatabase.list(`users`).valueChanges();
    this.users.subscribe(items => this.totalUsers = Object.keys(items).length);
    this.userfilter = this.firedatabase.list(`userfilter`).valueChanges();


  }

 
setActiveUser(user:string, index:number): void{
this.currentUser = user
this.key =this.currentUser.key
  this.currentIndex = index;
  this.styleOne = true;
}


  deleteUser(key:string){
    this.firedatabase.object(`users/${key}`).remove().then(() => {
      this.successDelete ="You successfully delete it!"
    })
    .catch(error => this.errorDelete= error);
    this.key=''
}
     
  
}
