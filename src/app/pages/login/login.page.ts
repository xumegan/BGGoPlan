import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/service/firebase.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:string;
  password:string; 

	constructor(
    private auth:FirebaseService,
    private toastController: ToastController,
    private loadingCtrl: LoadingController,
    ) { }
	
  ngOnInit() {}

  async login() {
    if(this.email&&this.password){
      const loading = await this.loadingCtrl.create({
        message:'Authenticating ...',
        spinner:'crescent',
        showBackdrop:true
      })
      loading.present()
      this.auth.loginUser(this.email,this.password)
    }else{
     // loading.dismiss()
      this.toast('please enter you email and passward','warning')
    }	
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