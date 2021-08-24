//this file is going to change a lot, it will upload picture


import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/service/firebase.service';
import { FileUpload } from 'src/app/model/file-upload';
import { User } from 'src/app/model/model';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.page.html',
  styleUrls: ['./create-new-user.page.scss'],
})
export class CreateNewUserPage implements OnInit {
  private basePath = '/users';
//user: User; should working on it later
name:string;
// key:string;will be the same key
 position:string;
 email:string;
 cell:string;
 type:string; 
 area:string;
profile_pic:string;
//selectedFiles:any;
userfilter:Observable<any[]>;
selectedFiles: FileList;
currentFileUpload: FileUpload;
currentUser:User;
  constructor(private firedatabase:
    AngularFireDatabase,
    private firebaseService:FirebaseService,
    public toastController: ToastController,
    ) { 

    this.userfilter = this.firedatabase.list(`userfilter`).valueChanges(); 
    //this.userfilter=firedatabase.getFilter(filter)
  }

  ngOnInit() {
  }

  selectFile(event): void {this.selectedFiles = event.target.files;}
  inputName (event) {this.name =event.target.value}
  // inputlastName (event): void {this.lastName =event.target.value}
   inputposition (event): void {this.position =event.target.value}
   inputemail(event): void {this.email =event.target.value}
   inputcell(event): void {this.cell =event.target.value}
   inputtype(event): void {this.type =event.target.value}
   inputarea(event): void {this.area =event.target.value}
   creatNewUser(): void {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new FileUpload(file);
    this.currentUser ={
      userId:'this.userId',
      name:this.name,//
      position:this.position,//
      email:this.email,//
      cell:this.cell,//
      type:this.type, //
      area:this.area,//
      key: 'this.key', 
      createAt: 'this.createAt',
    } 
    this.firebaseService.createUser(this.currentUser,this.currentFileUpload)
  }
  async toast(message, status){
    const toast = await this.toastController.create({
      message:message,
      color:status,
      position:'middle',
      duration:2000
    })
   toast.present();
  }
}




