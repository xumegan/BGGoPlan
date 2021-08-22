import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/model/model';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { FirebaseService } from 'src/app/service/firebase.service';
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  userId:any;
  user:User;
  updateUserForm:FormGroup;

  userfilter:Observable<any[]>;
  filterbyarea:any[];
  filterbytype:any[];

  constructor(
    private actRoute:ActivatedRoute, 
    private firebaseService:FirebaseService,
    private fb: FormBuilder,
    private router: Router,
    private firedatabase: AngularFireDatabase
    ) { 
      // this.us =this.firebaseService.getUser(this.userId).valueChanges().subscribe(res => {
      // this.user=res
      // console.log(this.user)
    // });

    // this.firebaseService.getUser(this.userId). valueChanges().subscribe();
  }

     ngOnInit() {
      this.userId= (this.router.url).split('/')[2];
      console.log(this.userId);

      this.updateUserForm = this.fb.group({
        email:[''],
        firstName:[''],
        lastName:[''],
        position:[''],
        cell:[''],
        type:[''], 
        area:[''],
      //  profile_pic:[''],
 
      })
      console.log(this.updateUserForm.value)

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
  
  updateForm() {
    this.firebaseService.updateUser(this.userId, this.updateUserForm.value)
    .then(() => {
         // this.router.navigate(['/']);
    })
    .catch(error => console.log(error));
  }
 }
