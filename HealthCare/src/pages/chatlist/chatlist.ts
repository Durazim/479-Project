import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { DbProvider } from '../../providers/db/db';
import { Observable } from 'rxjs/Observable';
import { ChatPage } from '../chat/chat';

/**
 * Generated class for the ChatlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatlist',
  templateUrl: 'chatlist.html',
})
export class ChatlistPage {

  private chats;

  constructor(public navCtrl: NavController, public navParams: NavParams, public DB: DbProvider) {
    this.chats = this.DB.getChatsNames();
  }

  ionViewDidLoad() {
    console.log(this.chats); 
    console.log('ionViewDidLoad ChatlistPage');
    this.chats = this.DB.getChatsNames();
  }

  goToChat(chat,name)
  {
    let flag:Boolean=true;
    this.navCtrl.push(ChatPage,{chats:chat,Name:name,flagCL:flag});
  }


}
