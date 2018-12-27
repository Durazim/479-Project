import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DbProvider } from '../../providers/db/db';
import { DoctorPage } from '../doctor/doctor';
import { HealtheducationPage } from '../healtheducation/healtheducation';
import { FavoritePage } from '../favorite/favorite';
import { ChatlistPage } from '../chatlist/chatlist';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public auth: AuthProvider, public DB: DbProvider) {

  }
    
  doctorsPage(){
    this.navCtrl.push(DoctorPage);
  }
  healedupage(){
    this.navCtrl.push(HealtheducationPage)
  }
  fav(){
    this.navCtrl.push(FavoritePage)
  }
  chatlist(){
    this.navCtrl.push(ChatlistPage)
  }

}

