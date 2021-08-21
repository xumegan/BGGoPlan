import { Component, Input, Output, EventEmitter } from '@angular/core';
//import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import {User} from '../model/model';
import { map } from 'rxjs/operators';
import { FirebaseService } from '../service/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users:any[];


  // user:User;
 // users:Observable<any[]>;
//   userfilter:Observable<any[]>;
//   typeFilter:any[];
//   area:any[];
// active:string;
// toggled:boolean;
//   buttonColor:string;


  // totalUsers:any;
  // currentUser = null;
  // currentIndex = -1;
  // id:any = '';
  // key:string;
  // styleOne: boolean = false;

  // successDelete:string;
  // errorDelete:string;

  // filterbyarea:any[];
  // filterbytype:any[];
  // filterTerm: string;
  // page = 0;
  // maximumPages = 3;
   @Input() user:User;
   @Output() refreshList: EventEmitter<any> = new EventEmitter();
  //private firebaseService:AngularFireDatabase,
  constructor(private firebaseService:FirebaseService) {
    // this.loadUsers();
    // const areatemp = []
    // const typetemp = []
    // this.userfilter = this.firedatabase.list(`userfilter`).valueChanges();  
    // this.userfilter
    // .subscribe(data => {
    //   data.forEach(val =>{
    //     if(val.type !== undefined){
    //       typetemp.push(`${val.type}`)
    //     }
    //     if(val.area !== undefined){
    //       areatemp.push(`${val.area}`)
    //     }      
    //   })
    //   this.filterbyarea = areatemp
    //   this.filterbytype = typetemp
    // })
  }

  ngOnInit(): void {
    this.firebaseService.getUsers().snapshotChanges().pipe(
      map(changes =>
        // store the key
        
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(users => {
      this.users = users;
      console.log(this.users)
    });
  }



 //loadUsers(event?){
 // this.users = this.firedatabase.list(`users`).valueChanges();
 // this.users.subscribe(res => {
 //   this.totalUsers = Object.keys(res).length
   //  res.sort((a:any,b:any)=>{
     // if(a.name.last < b.name.last){
   //     if(a.name < b.name){
    //    return -1;
   //   }
      //if(a.name.last > b.name.last){
    //    if(a.name > b.name){
    //    return 1;
    //  }
    //  return 0;
  //  })
    
   // if(event){
   //   event.target.compete();
  //  }
 // });
// }
   setActiveUser(user:string, index:number): void{
//     this.currentUser = user
//     this.key =this.currentUser.key
//     this.currentIndex = index;
//     this.styleOne = true;
//     //this.active = user;

//     if(this.toggled &&this.currentIndex){
//       this.buttonColor = '#345465';
//       this.toggled = false;
//  }
//  else{
//       this.buttonColor = 'red'; //hex code for previous color
//       this.toggled = true;
//   }
//   }

  // deleteUser(key:string){
  //   this.firedatabase.object(`users/${key}`).remove().then(() => {
  //     this.successDelete ="You successfully delete it!"
  //   })
  //   .catch(error => this.errorDelete= error);
  //   this.key=''
   } 
  
  //loadMore(event){
  //  this.page++;
  //  this.loadUsers(event);
  //  if(this.page === this.maximumPages){
  //    event.target.disabled = true;
  //  }
 // }
}


