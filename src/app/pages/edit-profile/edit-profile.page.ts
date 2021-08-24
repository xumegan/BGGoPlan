import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/model';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/service/firebase.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userId:any;
  user:User;
  email:string;
  name:string;
  // firstName:string;
  // lastName:string;
  position:string;
  cell:string;
  type:string; 
  area:string;
  profile_pic:string;

  userfilter:Observable<any[]>;
  filterbyarea:any[];
  filterbytype:any[];

  constructor( 
    private firebaseService:FirebaseService,
    private router: Router,
    private firedatabase: AngularFireDatabase,
    private toastController: ToastController,
    ) { 
  }

     ngOnInit() {
      this.userId= (this.router.url).split('/')[2];
      console.log(this.userId);
       this.firebaseService.getUser(this.userId)
       .valueChanges().subscribe(res=>{
        this.userId = this.userId;
        this.email=res.email;
        this.name=res.name;
        // this.firstName=res.name.firstName;
        // this.lastName=res.name.lastName;
        this.position=res.position;
        this.profile_pic=res.profile_pic
        this.cell=res.cell;
        this.area=res.area; 
        this.type=res.type;
       })
      
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
      console.log(this.filterbytype)
    })
  }
  async updateprofile(){
   
    this.firedatabase.list(`/contacts`).update(this.userId,{
      'editAt':Date(),
     // name:{firstName:this.firstName,lastName:this.lastName},
      name:this.name,
      position: this.position,
      email: this.email,
      cell: this.cell,
      type:this.type, 
      area:this.area,
      //profile_pic:this.profile_pic
    }).then(()=>{
      this.toast('Udate done!!','success');
      this.router.navigate([`/home/${this.userId}`])
    })

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
