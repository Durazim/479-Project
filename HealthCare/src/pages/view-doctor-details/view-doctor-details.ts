import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the ViewDoctorDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-doctor-details',
  templateUrl: 'view-doctor-details.html',
})
export class ViewDoctorDetailsPage {
  liked=false;
  doctor:any;
  user:any;
  email:any="";
  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth) {
    this.doctor=this.navParams.get('data');
    console.log(this.doctor);

    this.afAuth.authState.subscribe( user => { 
    
      this.user = user;
      if(user)
        this.email=user.email;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewDoctorDetailsPage');
  }

  favorite(){
    alert("this is just a fake fav for now :)")
  }
}
