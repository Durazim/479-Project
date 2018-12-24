import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseListObservable } from 'angularfire2/database';
import { MedicationsFormPage } from '../medications-form/medications-form';

/**
 * Generated class for the MedicationslistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicationslist',
  templateUrl: 'medicationslist.html',
})
export class MedicationslistPage {
  public Doctorlist: FirebaseListObservable<any[]>;
  public typeD:Boolean=false;

  public medkey;

  constructor(public navCtrl: NavController, public navParams: NavParams, public DB: DbProvider, public auth: AuthProvider) {
    this.medkey=this.navParams.data.medkey;
    
    this.Doctorlist = this.DB.getUsers();
    this.Doctorlist.subscribe(data => {
      data.forEach(doctor => {
        if ((doctor.email == this.auth.useremail) && (doctor.type == "Doctor")) {
          this.typeD = true;
          console.log(this.typeD)
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicationslistPage');
  }

  add()
  {
    this.navCtrl.push(MedicationsFormPage,{medkey:this.medkey});
  }

}
