import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { DbProvider } from '../../providers/db/db';
import { CommentStmt } from '@angular/compiler';
import { MedicationslistPage } from '../medicationslist/medicationslist';

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
  private chatkey;
  private chats:any=[];
  private flag=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public DB: DbProvider) {
    this.sen=this.DB.getUserKey();
    this.chatkey=this.navParams.data.chats;
    this.flag=this.navParams.data.flagCL;
    
    console.log(this.flag);
    if(this.flag)
    {
      let toArray =  this.chatkey.split("+");
      if(this.sen!=toArray[0])
      {
        this.rec=toArray[0];
      }
      else
      {
        this.rec=toArray[1];
      }
      this.recName=this.navParams.data.Name;
      console.log(this.recName);
    }
    else
      {
        this.rec=this.navParams.data.d;
        this.recName=this.navParams.data.n;
        console.log(this.recName);
      }
  }

  ionViewDidLoad() {
    this.DB.getChatsByKey(this.chatkey).subscribe(chat => 
      {
        this.chats=[];
        console.log(chat);
        chat.forEach(chatMsg=>{
          this.chats.push(chatMsg);
        })
      });
    console.log('ionViewDidLoad ChatPage');
  }

  add()
  {
    console.log(this.msg);
    if(this.msg.trim()!="")
      this.DB.pushMsg(this.rec,this.msg);
    this.msg="";
  }

  medpage()
  {
    this.navCtrl.push(MedicationslistPage,{medkey:this.chatkey});
  }

}
