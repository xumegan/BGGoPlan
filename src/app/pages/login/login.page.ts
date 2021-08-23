import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
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
    private toastController: ToastController) { }
	
  ngOnInit() {}

  login() {
    if(this.email&&this.password){
      this.auth.loginUser(this.email,this.password)
    }else{
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