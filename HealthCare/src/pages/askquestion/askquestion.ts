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
  public questionlist=[];
  public allquestions: FirebaseListObservable<any[]>;
  publ
  constructor(public navCtrl: NavController, public navParams: NavParams,public formbuilder: FormBuilder,public auth:AuthProvider,public DB:DbProvider) {
    this.questionForm = formbuilder.group({question: ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(255)]) ]
    });
    this.initializeItems();

    this.allquestions=this.DB.getQuestion();
    this.allquestions.subscribe(data=>{
      data.forEach(myquestion=>{
        if(myquestion.sender==this.auth.myuser.email){
        this.questionlist.push(myquestion)
        console.log(this.questionlist)

        }
      })
    })
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
    this.DB.addQuestion(this.newquestion);

    this.question="";
  }
  else{
    let doctor= "Dr. "+this.auth.myuser.fname +" "+ this.auth.myuser.lname;
   
    this.newquestion = {
      answer: this.questionForm.value.question,
      by: doctor,
      at:this.myDate,
      sender:this.auth.myuser.email,
      
    }
    this.DB.addQuestion(this.newquestion);

    this.question="";

  }
  }

  
}

