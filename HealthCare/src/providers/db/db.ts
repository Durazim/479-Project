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
    { 
      users.forEach(user => 
      { 
        if(user.$key==key) 
        { 
          if(user.type=="Doctor")
            uName="Dr."+user.fname+" "+user.lname;
          else
            uName=user.fname+" "+user.lname;

          console.log(uName);
          // console.log("-------");
          return uName;
        }
      }); 
    }); 
  }
  getHealthEducation() { return this.afdb.list('/HealthEducation/'); }
  getComment() { return this.afdb.list('/comments/'); }
  getFavorite(){return this.afdb.list('favorite')}
  getQuestion(){return this.afdb.list('/questions/')}
  getQuestionAnswers(){ return this.afdb.list('/replies/')};
  
  //Add

  addAnswerQuestion(answer){
    return this.afdb.list('/replies/').push(answer).then(() => {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'Answer Delivered to Patient',
        buttons: ['OK']
      });
      alert.present();
    });
  }

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

  addQuestion(question){
    this.afdb.list('/questions/').push(question).then(() => {
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'Question Delivered to Doctors',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  pushMsg(key2,msg)
  {
    
    if(this.ukey<key2)
      this.chatpath= '/chat/'+this.ukey+'+'+key2;
    else
      this.chatpath= '/chat/'+key2+'+'+this.ukey;
      

    let Senit = {
          message:msg,
          by:this.ukey
        }
    
    // console.log(this.chatpath);
    console.log(Senit);
    this.afdb.list(this.chatpath).push(Senit);
  }

  getChats()
  {
    return this.afdb.list('/chat/');
  }

  getChatsNames()
  {
    this.afdb.list('/chat/').subscribe(allChats =>
    {
      allChats.forEach(chat =>
      {
        let toArray =  chat.$key.split("+");
        if((toArray[0]==this.ukey)||(toArray[1]==this.ukey))
          if(this.ukey!=toArray[0])
          {
            this.chats=[];
            this.afdb.list('/users/').subscribe (users => 
            { users.forEach(user => 
              { 
                if(user.$key==toArray[0]) 
                { 
                  let uName:String="-";
                  if(user.type=="Doctor")
                    uName="Dr."+user.fname+" "+user.lname;
                  else
                    uName=user.fname+" "+user.lname;

                    let block = {
                      chat: chat.$key,
                      name: uName
                    }
                    this.chats.push(block);
                }
              }); 
            }); 
          }
          else
          {
            this.chats=[];
            this.afdb.list('/users/').subscribe (users => 
            { users.forEach(user => 
              { 
                if(user.$key==toArray[1]) 
                { 
                  let uName:String="-";
                  if(user.type=="Doctor")
                    uName="Dr."+user.fname+" "+user.lname;
                  else
                    uName=user.fname+" "+user.lname;

                    let block = {
                      chat: chat.$key,
                      name: uName
                    }
                    this.chats.push(block);
                }
              }); 
            }); 
          }
      });
    });
    return this.chats;
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
  UpdateUser(key, user) {

    this.afdb.list('/users/').update(key, user).then((response) => {
     alert('Details was updated!');
   });

  }

  pushChat(msg){
    this.afdb.list('/chat/').push(msg);
  }

  getChatsByKey(chatkey)
  {
    return this.afdb.list('/chat/'+chatkey);
  }

  pushMed(key,med)
  {
    let medPath = '/Medications/'+key;
    console.log(medPath);
    console.log(med);
    this.afdb.list(medPath).push(med);
  }

  getPharmaceuticals()
  {
    let pharList=[];
    this.afdb.list('/Pharmaceutical/').forEach(allP=>{
      allP.forEach(P=>{
        pharList.push(P);
      });
    });
    // console.log(pharList);
    return pharList;
  }

  pushPrescription(block,rKey)
  {
    let PerKey= '/Prescription/'+rKey;
    this.afdb.list(PerKey).push(block);
  }

  getPrescriptions(rKey)
  {
    let PrscList:FirebaseListObservable<any[]>;
    let PerKey= '/Prescription/'+rKey;
    // console.log(this.afdb.list(PerKey));
    PrscList=this.afdb.list(PerKey);

    //.subscribe(AllPresc=>{
  //   AllPresc.forEach(Presc=>{
  //     if(Presc.$key==rKey)
  //       PrscList.push(Presc);
  //       // Presc.forEach(P=>{
  //       //   console.log(P);
  //       // })
  //       // return Presc;
  //   });
  // });
    return PrscList;
  }
}
