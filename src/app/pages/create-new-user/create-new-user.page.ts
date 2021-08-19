import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.page.html',
  styleUrls: ['./create-new-user.page.scss'],
})
export class CreateNewUserPage implements OnInit {
//user: User; should working on it later
name:string;
// key:string;will be the same key
position:string;
email:string;
cell:string;
type:string; 
area:string;
  constructor(private firedatabase:AngularFireDatabase,) { }

  ngOnInit() {
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
