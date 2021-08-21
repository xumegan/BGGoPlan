import { Injectable } from '@angular/core';
import { User } from '../model/model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';



@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

private basePath = '/users';
private filterPath = '/userfilter';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  getUsers(): AngularFireList<User> {
    return this.db.list(this.basePath);
      
  }


  
}
