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
submitted = false;
  constructor(private firedatabase:AngularFireDatabase,) { 
    this.submitted = false;
  }

  ngOnInit() {
  }
  creatNewUser(){
    const list = this.firedatabase.list(`/users`)
    list.push({     
      date:Date(),
      id:`${Date.now()}`,
      name:this.name,
      position: this.position,
      email: this.email,
      cell: this.cell,
      type:this.type, 
      area:this.area,
    }).then(ref=>{
      this.firedatabase.object(`users/${ref.key}`).update({ key:ref.key})
  });
    this.submitted = true;
       //this.user = null
  }
}
