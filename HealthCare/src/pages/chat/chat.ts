import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { DbProvider } from '../../providers/db/db';
import { CommentStmt } from '@angular/compiler';

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
      // let toArray =  this.chat.$key.split("+");
      // if(this.sen!=toArray[0])
      // {
      //   this.rec=toArray[0];
      // }
      // else
      // {
      //   this.rec=toArray[1];
      // }
      // // console.log(this.rec);
      // this.recName=this.DB.getUserName(this.rec);
      // console.log(this.recName);

      this.DB.getChats().subscribe(allChats => 
      {
        allChats.forEach(chat => 
        {
          if(chat.$key==this.chatkey)
          { 
            let toArray =  chat.$key.split("+");
            if(this.sen!=toArray[0])
              this.rec=toArray[0];
            else
              this.rec=toArray[1];

            console.log(chat);
            // chat.forEach(element => {
            //   this.chats.push(element);
            // });
            // console.log(this.chats);
            // this.recName=this.DB.getUserName(this.rec);
            console.log(this.rec);

            this.DB.getUsers().subscribe (users => 
            { 
              users.forEach(user => 
              { 
                if(user.$key==this.rec) 
                { 
                  if(user.type=="Doctor")
                    this.recName="Dr."+user.fname+" "+user.lname;
                  else
                    this.recName=user.fname+" "+user.lname;
                }
              }); 
            }); 
            console.log(this.recName);
          }
        });    
      });
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
