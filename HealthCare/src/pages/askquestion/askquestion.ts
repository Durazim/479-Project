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

  constructor(public navCtrl: NavController, public navParams: NavParams,public formbuilder: FormBuilder,public auth:AuthProvider,public DB:DbProvider) {
    this.questionForm = formbuilder.group({question: ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(255)]) ]
    });

  }

  initializeItems() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskquestionPage');
  }

  thequestions(){

    let patient=this.auth.myuser.fname +" "+ this.auth.myuser.lname;
   
    this.newquestion = {
      question: this.questionForm.value.question,
      by: patient,
      at:this.myDate,
      sender:this.auth.myuser.email,
      ukey:this.auth.myuser.$key
    }
    this.DB.addQuestion(this.newquestion);

    this.question="";
  }
  
  }
  

  


