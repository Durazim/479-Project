import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { DbProvider } from '../../providers/db/db';

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  private msg:string="";
  private rec;
  private sen;
  private recName;
  private chat;
  private flag=false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public DB: DbProvider) {
    this.sen=this.DB.getUserKey();
    this.flag=this.navParams.data.flagCL;
    console.log(this.flag);
    if(this.flag)
    {
      this.chat=this.navParams.data.chat;
      console.log(this.chat.$key);
      let toArray =  this.chat.$key.split("+");
      if(this.sen!=toArray[0])
      {
        this.rec=toArray[0];
      }
      else
      {
        this.rec=toArray[1];
      }
      console.log(this.rec);
      this.recName=this.DB.getUserName(this.rec);
      console.log(this.recName);
    }
    else
      this.rec=this.navParams.data.d;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  add()
  {
    console.log(this.msg);
    if(this.msg.trim()!="")
      this.DB.pushMsg(this.rec,this.msg);
  }

}
