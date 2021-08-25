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
 // @Input() fileUpload: FileUpload;
  userId:any;
  email:string;
  name:string;
  position:string;
  cell:string;
  type:string; 
  area:string;
  profile_pic:string;
  key:string;
  fileName:any;
  constructor(
    private actRoute:ActivatedRoute, 
    private firebaseService:FirebaseService,
    private router:Router,
    private alertCtl:AlertController, 
    ) { }

  ngOnInit(): void {
    this.fetchData(); 
  } 
    
  fetchData(){
    this.userId = this.actRoute.snapshot.paramMap.get('userId');
    this.firebaseService.getUser(this.userId)
    .valueChanges().subscribe(res => {
      this.email=res.email;
      this.name=res.name;
      this.position=res.position;
      this.profile_pic=res.profile_pic;
      this.cell=res.cell;
      this.area=res.area; 
      this.type=res.type;
      this.key=res.key;
      this.fileName=res.fileName;
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
          this.firebaseService.deleteFileDatabase(this.userId).then(() => {
            this.firebaseService.deleteFileStorage(this.fileName);
          }).then(()=>{
            this.fetchData();this.router.navigate(['/home'])}).catch(
              // error => console.log(error)
              )}
      }]
    }).then(alertEl=>{
      alertEl.present();
    }) 
  }
}


