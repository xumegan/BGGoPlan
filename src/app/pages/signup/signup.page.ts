import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  private basePath = '/contacts';
  name:string;
  //firstName:string;
  //lastName:string;
  email:string;
  password:string;

  constructor(
    private db:AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router:Router,
    private loadingCtrl: LoadingController,
    private toastController: ToastController
    ) {}

  ngOnInit() {}

  async register(){
    if(this.name&&this.email&&this.password){
      const loading = await this.loadingCtrl.create({
        message:'Authenticating ...',
        spinner:'crescent',
        showBackdrop:true
      })
      loading.present()
      this.afAuth.createUserWithEmailAndPassword(this.email, this.password)
      .then((data)=>{
        console.log(data)
        data.user.sendEmailVerification();
        this.db.list(this.basePath).push({
          userId:data.user.uid,
          createAt:Date.now(),
          //name:{firstName:this.firstName,lastName:this.lastName},
          name:this.name,
          email: this.email,
          area:'',
          type:'',
          position: '',
          cell: '',
          profile_pic:''

        }).then(()=>{
          loading.dismiss();
          this.toast('registration done!!','success');
          this.router.navigate(['/login'])
        }).catch(error =>{
          loading.dismiss();
          this.toast(error.message,'danger')
        })
      }).catch(error =>{
        loading.dismiss();
        this.toast(error.message,'danger')
      })
    }else{
      this.toast('please fill in the form','warning')
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
