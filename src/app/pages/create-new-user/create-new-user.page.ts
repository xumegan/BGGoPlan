//this file is going to change a lot, it will upload picture


import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-create-new-user',
  templateUrl: './create-new-user.page.html',
  styleUrls: ['./create-new-user.page.scss'],
})
export class CreateNewUserPage implements OnInit {
  private basePath = '/contacts';
//user: User; should working on it later
name:string;
// key:string;will be the same key
position:string;
email:string;
cell:string;
type:string; 
area:string;

userfilter:Observable<any[]>;
  constructor(private firedatabase:AngularFireDatabase,public toastController: ToastController) { 
    this.userfilter = this.firedatabase.list(`userfilter`).valueChanges(); 
  }

  ngOnInit() {
  }
  creatNewUser(){
    const list = this.firedatabase.list(this.basePath)
    list.push({     
      date:Date(),
      id:`${Date.now()}`,
      name:this.name,
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
















// //later user
// // async toast(message, status){
//   //   const toast = await this.toastController.create({
//   //     message:message,
//   //     color:status,
//   //     position:'middle',
//   //     duration:2000
//   //   })
//   //  toast.present();
//   // };//end toast


//   // this.router.navigate(['/home']);
//   // this.firstName ='';
//   // this.lastName ='';
//   //     this.position ='';
//   //      this.email ='';
//   //      this.cell ='';
//   //     this.type ='' ;
//   //    this.area ='';
//   //    this.selectedFiles = undefined;


//   // selectFile(event): void {
//   //   this.selectedFiles = event.target.files;
//   //   const file = this.selectedFiles.item(0);  
//   //   const filePath = `${'/users'}/${file}`;
//   //   const storageRef = this.storage.ref(filePath);
//   //   const uploadUser = this.storage.upload(filePath, file);
//   //    let urll =''; 
//   //   uploadUser.snapshotChanges().pipe(
//   //     finalize(() => {            
//   //       storageRef.getDownloadURL().subscribe(downloadURL => {
//   //        urll = downloadURL;        
//   //        console.log(urll) 
//   //        console.log(downloadURL)
//   //        this.url=downloadURL
//   //        this.saveFiletoDatabase() 
//   //       });
//   //       console.log(urll) 
//   //     })//end pip
//   //   //  this.url =urll
//   //  // console.log(urll) 
//   //   ).subscribe();
//   // }
