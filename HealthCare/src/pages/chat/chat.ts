import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { DbProvider } from '../../providers/db/db';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  private msg:string="";
  private d;


  constructor(public navCtrl: NavController, public navParams: NavParams, public DB: DbProvider) {
    this.d=this.navParams.data.d;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  add()
  {
    console.log(this.d);
    console.log(this.msg);
  }

}
