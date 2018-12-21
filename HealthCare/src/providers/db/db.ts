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

  constructor(public afdb: AngularFireDatabase, public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    console.log('Hello DbProvider Provider');
  }

  //gets

  getUsers() { return this.afdb.list('/users/'); }
  getHealthEducation() { return this.afdb.list('/HealthEducation/'); }
  getComment() { return this.afdb.list('/comments/'); }
  getFavorite(){return this.afdb.list('favorite')}

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
  addComment(comment){
    this.afdb.list('/comments/').push(comment);
  }

  addFavorite(favorite){
    this.afdb.list('/favorite/').push(favorite);
  }

  //delete
  
  deleteaComments(comment, key) {
    this.afdb.list('/deletedcomment(just a test)/').push(comment)

    this.afdb.list('/comments/').remove(key)
      .then((response) => {
        alert('comment was deleted!');
      });
  }
  deleteFavorite(key){
    this.afdb.list('/favorite/').remove(key)
  }
  
  //update


  pushChat(msg){
    this.afdb.list('/chat/').push(msg);
  }

}
