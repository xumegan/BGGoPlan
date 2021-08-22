import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import {User} from '../../model/model';

@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.page.html',
  styleUrls: ['./create-new-user.page.scss'],
})
export class CreateNewUserPage implements OnInit {
user: User; 
position:string;
email:string;
cell:string;
type:string; 
area:string;

userfilter:Observable<any[]>;
  filterbyarea:any[];
  filterbytype:any[];
  firstName: any;
  lastName: any;
  constructor(
    private firedatabase: AngularFireDatabase,
    public toastController: ToastController
    ) { }

  ngOnInit() {
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
    })
  }
  creatNewUser(){
    const list = this.firedatabase.list(`/users`)
    list.push({     
      date:Date(),
      id:`${Date.now()}`,
      name:{firstName:this.firstName,lastName:this.lastName},
      position: this.position,
      email: this.email,
      cell: this.cell,
      type:this.type, 
      area:this.area,
      profile_pic:"https://firebasestorage.googleapis.com/v0/b/fir-authreact-f0c50.appspot.com/o/products%2F2.jpg?alt=media&token=316ddc5b-f0c1-4b0c-804a-d97e43f057f5"
    }).then(ref=>{
      this.firedatabase.object(`users/${ref.key}`).update({ key:ref.key})
  });
    this.presentToast()
       //this.user = null
       //this.user.reset()
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await toast.present();
    const { role } = await toast.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
