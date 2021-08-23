import { Injectable } from '@angular/core';
import { User } from '../model/model';
import { AngularFireDatabase, AngularFireList,AngularFireObject } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable,of } from 'rxjs';
import { finalize,switchMap } from 'rxjs/operators';
import { LoadingController,ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
userRef:AngularFireObject<any>;
usersRef:AngularFireList<any>;
filterRef:Observable<any[]>;
user$:Observable<User>;
users:User[];
//private basePath = '/users';
private basePath = '/contacts';
private filterPath = '/userfilter';

  constructor(
    private db: AngularFireDatabase, 
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private LoadingCtrl: LoadingController,
    private toastController: ToastController,
    private router:Router
    ) {
      this.user$ = this.afAuth.authState.pipe(
  switchMap(user=>{
    if(user){
      return this.db.list(this.basePath).valueChanges();
    }else{
      return of(null)
    
    }
  })
        )

     } //end of constructor
     async toast(message, status){
       const toast = await this.toastController.create({
         message:message,
       color:status,
       position:'top',
       duration:2000
       })
      
     }

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
      profile_pic:user.profile_pic,
   
    })
  }


  deleteUser(userId: string): void {
    this.deleteFileDatabase(userId).then(() => {
        this.deleteFileStorage(userId);
      })
      .catch(error => console.log(error));
  }

 
  getFilter(){
    this.filterRef = this.db.list(this.filterPath).valueChanges(); 
    return this.filterRef 
  }



signUpUser(email:string, password:string):Promise<any>{
  return this.afAuth.createUserWithEmailAndPassword(email, password)
 }

async loginUser(email:string, password:string){
  const loading = await this.LoadingCtrl.create({
    message:'Authenticating ...',
    spinner:'crescent',
    showBackdrop:true
  })
  loading.present()
  this.afAuth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
  .then(()=>{
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then((data)=>{
      if(!data.user.emailVerified)
    {
loading.dismiss();
this.router.navigate(['/home'])
    }
  })
  .catch(error =>{
    loading.dismiss();
    this.toast(error.message,'danger')
  })
    
  }).catch(error =>{
    loading.dismiss();
    this.toast(error.message,'danger')
  })
 }


 async Logout(){
  const loading = await this.LoadingCtrl.create({
    spinner:'crescent',
    showBackdrop:true
  })
  loading.present()
  this.afAuth.signOut()
     .then(() => {
      loading.dismiss();
      this.router.navigate(['/login'])  
   })
 } 




///for upload file
  pushFileToStorage(user: User): Observable<number> {
    const filePath = `${this.basePath}/${user.profile_pic.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadUser = this.storage.upload(filePath, user.profile_pic);

    uploadUser.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
         user.url = downloadURL;
         user.name = user.profile_pic.name;
          this.saveFileData(user);
        });
      })
    ).subscribe();

    return uploadUser.percentageChanges();
  }


////
private deleteFileDatabase(key: string): Promise<void> {
  return this.db.list(this.basePath).remove(key);
}

private deleteFileStorage(name: string): void {
  const storageRef = this.storage.ref(this.basePath);
  storageRef.child(name).delete();
}

private saveFileData(user: User): void {
  this.db.list(this.basePath).push({
    //user
    email: user.email,
    firstName:user.firstName,
    lastName:user.lastName,
    position: user.position,
    cell: user.cell,
    type:user.type, 
    area:user.area,
    profile_pic:user.url,
  
  });
}

}


