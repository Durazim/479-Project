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
  arrayOfhealeducation = [];
  searched: any;
  list: any;
  flag: Boolean = false;
  result: any;



  constructor(public navCtrl: NavController, public navParams: NavParams, public DB: DbProvider) {

    this.healtheducation = this.DB.getHealthEducation();
    this.healtheducation.subscribe(data => {
      data.forEach(health => {
        this.arrayOfhealeducation.push(health);
      });
    });
    this.initializeItems();
  }//end of consturctor
  ionViewDidLoad() {
    console.log('ionViewDidLoad HealtheducationPage');
  }


  addHE() {
    this.navCtrl.push(AddHealthEducationPage);
  }

  initializeItems() {
    this.searched = this.arrayOfhealeducation;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.flag = true;
      this.result = this.searched.filter((search) => {
        this.list = (((search.fname.toLowerCase() +" "+ search.lname.toLowerCase()) + search.topic.toLowerCase()+search.title.toLowerCase()).indexOf(val.toLowerCase()) > -1);
        return this.list;
      })
    }
    else
      this.flag = false;

  }

}
