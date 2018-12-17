import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.doctor=this.navParams.get('data');
    console.log(this.doctor);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewDoctorDetailsPage');
  }

}
