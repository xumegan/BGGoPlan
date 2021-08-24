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
import { Filter } from '../model/filter';
import { FileUpload } from '../model/file-upload';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
userRef:AngularFireObject<any>;
usersRef:AngularFireList<any>;
filterRef:Observable<any[]>;
user$:Observable<User>;
users:User[];

userfilter:Observable<any>;
  filterbyarea:any[];
  filterbytype:any[];
private basePath = '/users';
//private basePath = '/contacts';
private filterPath = '/userfilter';

  constructor(
    private db: AngularFireDatabase, 
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
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
      name:user.name,
      //{firstName:user.firstName,lastName:user.lastName},
      email: user.email,
      position: user.position,
      cell: user.cell,
      type:user.type, 
      area:user.area,
     // profile_pic:"https://firebasestorage.googleapis.com/v0/b/fir-authreact-f0c50.appspot.com/o/products%2F2.jpg?alt=media&token=316ddc5b-f0c1-4b0c-804a-d97e43f057f5"
    })
  }



  deleteUser(userId: string): void {
    this.deleteFileDatabase(userId).then(() => {
        this.deleteFileStorage(userId);
      })
      .catch(error => console.log(error));
  }

 
  getFilter(filter:string){
   // userfilter:{}
    const areatemp = []
    const typetemp = []
    this.userfilter = this.db.list(this.filterPath).valueChanges();  
    this.userfilter.subscribe(data => {
      data.forEach(val =>{
        if(val.type === filter){
          typetemp.push(`${val.type}`)
        }
        if(val.area === filter){
          return   this.filterbyarea.push(`${val.area}`)
        }      
      })
    //return  this.filterbyarea = areatemp
    //  this.filterbytype = typetemp
      //console.log(this.filterbyarea)
     // console.log(this.filterbyarea)
    })
   //this.filterRef = this.db.list(this.filterPath).valueChanges(); 
   // return this.filterRef 
  }



signUpUser(email:string, password:string):Promise<any>{
  return this.afAuth.createUserWithEmailAndPassword(email, password)
 }

async loginUser(email:string, password:string){
  const loading = await this.loadingCtrl.create({
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
  const loading = await this.loadingCtrl.create({
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
async createUser(user:User,fileUpload: FileUpload) {
  const loading = await this.loadingCtrl.create({
    message:'Creating ...',
    spinner:'crescent',
    showBackdrop:true
  })
  loading.present()
  const filePath = `${this.basePath}/${fileUpload.file.name}`;
  const storageRef = this.storage.ref(filePath);
  const uploadTask = this.storage.upload(filePath, fileUpload.file);

  uploadTask.snapshotChanges().pipe(
    finalize(() => {
      this.storage.ref(filePath).getDownloadURL().subscribe(downloadURL => {
        fileUpload.url = downloadURL;
        fileUpload.filename = fileUpload.file.name;

        this.saveallData(user,fileUpload).then(()=>{
          this.toast('Create new user done!!','success');
          loading.dismiss();
        }).then(()=>{
          this.router.navigate(['/home'])
        }).catch(error =>{
          loading.dismiss();
          this.toast(error.message,'danger')
      }).catch(error =>{
        loading.dismiss();
        this.toast(error.message,'danger')
      });
      });
    })
  ).subscribe();
}

private deleteFileDatabase(key: string): Promise<void> {
  return this.db.list(this.basePath).remove(key);
}

private deleteFileStorage(name: string): void {
  const storageRef = this.storage.ref(this.basePath);
  storageRef.child(name).delete();
}

  private async saveallData(user: User,fileUpload: FileUpload){
    
    this.db.list(this.basePath).push({
      email: user.email,
      fileName:fileUpload.filename,
      name:user.name,
      position: user.position,
      cell: user.cell,
      type:user.type, 
      area:user.area,
      profile_pic:fileUpload.url,
    }).then(ref=>{
       this.db.object(`${this.basePath}/${ref.key}`).update({ key:ref.key})
    })
  }

  async toast(message, status){
    const toast = await this.toastController.create({
      message:message,
      color:status,
      position:'middle',
      duration:1000
    })
   toast.present();
  }

}


