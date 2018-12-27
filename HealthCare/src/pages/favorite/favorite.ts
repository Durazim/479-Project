import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { DbProvider } from '../../providers/db/db';
import { AuthProvider } from '../../providers/auth/auth';
import { ViewDoctorDetailsPage } from '../view-doctor-details/view-doctor-details';

/**
 * Generated class for the FavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {
  public fav: FirebaseListObservable<any[]>;
  public favlist=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public DB:DbProvider,public auth:AuthProvider) {
    this.fav=this.DB.getFavorite();
    this.fav.subscribe(data=>{
      data.forEach(myfavs=>{
        if(myfavs.user==this.auth.useremail){
          console.log("yes")
          this.favlist.push(myfavs)
        }
      })
    })

  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritePage');
  }



}
