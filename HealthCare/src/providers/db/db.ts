import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase/app';

/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  public chatpath;

  constructor(public afdb: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    console.log('Hello DbProvider Provider');
  }

  //gets

  getUsers() { return this.afdb.list('/users/'); }
  getHealthEducation() { return this.afdb.list('/HealthEducation/'); }

  //Add
  addUserToDB(newaccount) {
    this.afdb.list('/users/').push(newaccount);
  }

  AddHealthEducation(items) {
    this.afdb.list('/HealthEducation/').push(items)
      .then(() => {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'Added Successfully',
          buttons: ['OK']
        });
        alert.present();
      });;
  }

  // CreateChat(dKey,pKey)
  // {
  //   let keys = {
  //     Doctor:dKey,
  //     Patient:pKey
  //   }
  //   this.chatpath= '/chat/'+dKey+pKey;
  //   console.log(this.chatpath);
  //   // this.afdb.list(this.chatpath).push(keys);
  // }

  // pushMsg(msg){
  //   this.afdb.list('/chat/').push(msg);
  // }

}
