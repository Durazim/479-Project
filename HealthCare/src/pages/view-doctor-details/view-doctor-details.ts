import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ChatPage } from '../chat/chat';
import { DoctorPage } from '../doctor/doctor';
import { DbProvider } from '../../providers/db/db';

@IonicPage()
@Component({
  selector: 'page-view-doctor-details',
  templateUrl: 'view-doctor-details.html',
})
export class ViewDoctorDetailsPage {
  liked=false;
  doctor:any;
  user:any;
  ukey:any;
  email:any="";
  constructor(public navCtrl: NavController, public DB: DbProvider, public navParams: NavParams,public afAuth: AngularFireAuth) {
    this.doctor=this.navParams.get('data');
    console.log(this.doctor);
    this.ukey=this.DB.getUserKey();
    this.afAuth.authState.subscribe( user => { 
      this.user = user;
      if(user)
        this.email=user.email;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewDoctorDetailsPage');
  }

  chat(){
    this.navCtrl.push(ChatPage,{d:this.doctor.$key});
  }

  favorite(){
    alert("this is just a fake fav for now :)")
  }
}
