import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { DbProvider } from '../../providers/db/db';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  
  arrayofDoctors = [];
  public Doctorlist: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public DB: DbProvider, public auth:AuthProvider ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
