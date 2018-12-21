import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AlertController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class DbProvider {

  private chatpath:any;
  private ukey:any;
  private toArray:any;

  public chats:any=[];
  // chats:FirebaseListObservable<any[]>;

  constructor(public afdb: AngularFireDatabase, public auth:AuthProvider , public afAuth: AngularFireAuth, public alertCtrl: AlertController) {
    console.log('Hello DbProvider Provider');
    this.afdb.list('/users/').subscribe (users => 
      { users.forEach(user => 
        { 
          if(user.email.toLowerCase()==this.auth.useremail.toLowerCase()) 
            this.ukey=user.$key;
        }); 
      });
  }

  //gets

  getUsers() { return this.afdb.list('/users/'); }
  getUserKey() { return this.ukey; }
  getUserName(key) 
  { 
    let uName:String="";
    this.afdb.list('/users/').subscribe (users => 
    { users.forEach(user => 
      { 
        if(user.$key==key) 
        { 
          if(user.type=="Doctor")
            uName="Dr."+user.fname+" "+user.lname;
          else
            uName=user.fname+" "+user.lname;

          console.log(uName);
          // return uName;
        }
      }); 
    }); 
    return uName;
  }
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

  pushMsg(key2,msg){
    
    if(this.ukey<key2)
      this.chatpath= '/chat/'+this.ukey+'+'+key2;
    else
      this.chatpath= '/chat/'+key2+'+'+this.ukey;
      

    let block = {
          message:msg,
          by:this.ukey
        }
    
    // console.log(this.chatpath);
    console.log(block);
    this.afdb.list(this.chatpath).push(block);
  }

  getChats()
  {
    this.afdb.list('/chat/').subscribe(allChats => 
    {
      allChats.forEach(chat => 
      {
        let toArray =  chat.$key.split("+");
        // console.log(chat);
        if((toArray[0]==this.ukey)||(toArray[1]==this.ukey))
        {
          if(toArray[0]!=this.ukey)
            this.afdb.list('/users/').subscribe (users => 
              { users.forEach(user => 
                { 
                  if(user.$key==toArray[0]) 
                  { 
                    let block = {
                      chat:chat,
                      name:(user.fname+" "+user.lname)
                    }
                    // console.log(block);
                    this.chats.push(block); 
                  }
                }); 
              });
          else
            this.afdb.list('/users/').subscribe (users => 
              { users.forEach(user => 
                { 
                  if(user.$key==toArray[1]) 
                  { 
                    let block = {
                      chat:chat,
                      name:(user.fname+" "+user.lname)
                    }
                    console.log(block);
                  }
                }); 
              });
        }
      });    
    });

    return this.chats;
  }

}
