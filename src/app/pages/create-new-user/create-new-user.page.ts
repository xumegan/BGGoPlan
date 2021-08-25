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
  name:string;
  position:string;
  email:string;
  cell:string;
  type:string; 
  area:string;
  profile_pic:string;
  userfilter:Observable<any[]>;
  filterbyarea:any[];
  filterbytype:any[];
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  currentUser:User;
  img1:any; 
  constructor(private firedatabase:
    AngularFireDatabase,
    private firebaseService:FirebaseService,
    public toastController: ToastController,
    ) { 

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
        console.log(typeof(this.filterbytype))
      })
  }

  ngOnInit() {}
  
  selectFile(event): void {
    this.selectedFiles = event.target.files;
    
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    } 
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
   // console.log(file);
  }
  inputName (event) {this.name =event.target.value}
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
      fileName:'',
      createAt: `${Date.now()}`,
    } 
    this.firebaseService.createUser(this.currentUser,this.currentFileUpload).then(()=>{
      this.selectedFiles=null;
      this.name ='';
      this.position ='';
      this.email ='';
      this.cell ='';
      this.type ='';
      this.area ='';
    }  
  )  
}

  async toast(message, status){
    const toast = await this.toastController.create({
      message:message,
      color:status,
      position:'middle',
      duration:2000
    })
   toast.present();
  };
}




