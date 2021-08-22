import { Injectable } from '@angular/core';
import { User } from '../model/model';
import { AngularFireDatabase, AngularFireList,AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
userRef:AngularFireObject<any>;
usersRef:AngularFireList<any>;
filterRef:Observable<any[]>;

users:User[];
private basePath = '/users';
private filterPath = '/userfilter';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

getUsers() {
  this.usersRef = this.db.list(this.basePath);
  return this.usersRef;
}

getUser(id: string) {
  this.userRef = this.db.object(this.basePath+'/'+id);
  return this.userRef;
}

  updateUser(id, user: User) {
    return this.userRef.update({
      name:{firstName:user.firstName,lastName:user.lastName},
      email: user.email,
      position: user.position,
      cell: user.cell,
      type:user.type, 
      area:user.area,
     // profile_pic:"https://firebasestorage.googleapis.com/v0/b/fir-authreact-f0c50.appspot.com/o/products%2F2.jpg?alt=media&token=316ddc5b-f0c1-4b0c-804a-d97e43f057f5"
    })
  }

  
  createUser(user: User) {
    return this.userRef.set({
      // name: user.name,
      // id:user.id,
      email: user.email,
      firstName:user.firstName,
      lastName:user.lastName,
      position: user.position,
      cell: user.cell,
      type:user.type, 
      area:user.area,
     // profile_pic:"https://firebasestorage.googleapis.com/v0/b/fir-authreact-f0c50.appspot.com/o/products%2F2.jpg?alt=media&token=316ddc5b-f0c1-4b0c-804a-d97e43f057f5"
   
    })
  }


  deleteUser(userId: string): void {
    this.deleteFileDatabase(userId)
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  // deleteUser(key:string){
  //   this.firedatabase.object(`users/${key}`).remove().then(() => {
  //     this.successDelete ="You successfully delete it!"
  //   })
  //   .catch(error => this.errorDelete= error);
  //   this.key=''
 //  } 
  getFilter(){
    this.filterRef = this.db.list(this.filterPath).valueChanges(); 
    return this.filterRef 
  }
}


