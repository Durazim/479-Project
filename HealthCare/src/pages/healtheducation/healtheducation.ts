import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddHealthEducationPage } from '../add-health-education/add-health-education';
import { FirebaseListObservable } from 'angularfire2/database';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the HealtheducationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-healtheducation',
  templateUrl: 'healtheducation.html',
})
export class HealtheducationPage {
  public healtheducation: FirebaseListObservable<any[]>;
  public listofhd=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public DB: DbProvider) {

    this.healtheducation = this.DB.getHealthEducation();
    this.healtheducation.subscribe(data => {
      data.forEach(list => {
        this.listofhd.push(list);
      });
      console.log(this.listofhd);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealtheducationPage');
  }


  addHE(){
    this.navCtrl.push(AddHealthEducationPage);
  }
}


