import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup , Validators , FormBuilder} from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { DbProvider } from '../../providers/db/db';
import { FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the AskquestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-askquestion',
  templateUrl: 'askquestion.html',
})
export class AskquestionPage {
  public question;
  public newquestion:any
  questionForm: FormGroup;
  myDate: any = Date.now();
  public questionlist:any;
 
  publ
  constructor(public navCtrl: NavController, public navParams: NavParams,public formbuilder: FormBuilder,public auth:AuthProvider,public DB:DbProvider) {
    this.questionForm = formbuilder.group({question: ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(255)]) ]
    });
    this.initializeItems();

    this.questionlist=this.DB.getQuestion(this.auth.myuser.$key);

  }


  initializeItems() {
    this.questionlist = [];
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AskquestionPage');
  }

  thequestions(){
    this.initializeItems();
    if(this.auth.myuser.type=="Patient"){
    let patient=this.auth.myuser.fname +" "+ this.auth.myuser.lname;
   
    this.newquestion = {
      question: this.questionForm.value.question,
      by: patient,
      at:this.myDate,
      sender:this.auth.myuser.email
    }
    this.DB.addQuestion(this.newquestion,this.auth.myuser.$key);

    this.question="";
  }
  
  }

  
}

