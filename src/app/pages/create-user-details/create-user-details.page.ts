import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-create-user-details',
  templateUrl: './create-user-details.page.html',
  styleUrls: ['./create-user-details.page.scss'],
})
export class CreateUserDetailsPage implements OnInit {
  userId:any;
  email:string;
  firstName:string;
  lastName:string;
  position:string;
  cell:string;
  type:string; 
  area:string;

  constructor(
    private actRoute:ActivatedRoute, 
    private firebaseService:FirebaseService,
    private router:Router,
    private alertCtl:AlertController, 
    ) { }

  ngOnInit() {
    this.userId = this.actRoute.snapshot.paramMap.get('userId');
    this.firebaseService.getUser(this.userId)
    .valueChanges().subscribe(res => {
      this.email=res.email;
      this.firstName=res.name.firstName;
      this.lastName=res.name.lastName;
      this.position=res.position;
      this.cell=res.cell;
      this.area=res.area; 
      this.type=res.type;
    });
  } 
    
  onDeleteUser(){
    this.alertCtl.create({
      header:"are you sure?",
      message:"do you want to do it",
      buttons:[{
      text:'cancel',
      role:'cancel'
      },{
        text:'delete',
        handler:()=>{
          this.firebaseService.deleteUser(this.userId);
          this.router.navigate(['/home']) 
        }
      }]
    }).then(alertEl=>{
      alertEl.present();
    }) 
  }
}


