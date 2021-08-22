import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../model/model';
import { FirebaseService } from '../service/firebase.service';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  users=[];
  totalUsers:any;

  userfilter:Observable<any[]>;
  filterbyarea:any[];
  filterbytype:any[];
 
  constructor(private firebaseService:FirebaseService,private firedatabase: AngularFireDatabase) {
    const areatemp = []
    const typetemp = []
    this.userfilter = this.firedatabase.list(`userfilter`).valueChanges();  
    this.userfilter
    .subscribe(data => {
      data.forEach(val =>{
        if(val.type !== undefined){
          typetemp.push(`${val.type}`)
        }
        if(val.area !== undefined){
          areatemp.push(`${val.area}`)
        }      
      })
      this.filterbyarea = areatemp
      this.filterbytype = typetemp
    })
  }

  ngOnInit() {
    this.fetchUsers();
    
    let userRes = this.firebaseService.getUsers();
    userRes.snapshotChanges().subscribe(res => {
      this.users = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.users.push(a as User);
      })
    });    
  }

  fetchUsers() {
    this.firebaseService.getUsers().valueChanges().subscribe(res => {
      this.totalUsers = Object.keys(res).length;
      res.sort((a:any,b:any)=>{
        if(a.name.lastName < b.name.lastName){
          if(a.name < b.name){
            return -1;
          }
          if(a.name.lastName > b.name.lastName){
            if(a.name > b.name){
              return 1;
            }
            return 0;
          }
        }
      })
    })
  }

// clearFilter(){
//   //this.user.type = []
//       this.filterbytype = []
// }

}
