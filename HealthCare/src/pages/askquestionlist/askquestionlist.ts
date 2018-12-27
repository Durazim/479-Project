import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup , Validators , FormBuilder} from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { DbProvider } from '../../providers/db/db';
/**
 * Generated class for the AskquestionlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-askquestionlist',
  templateUrl: 'askquestionlist.html',
})
export class AskquestionlistPage {
  public answer;
  public newanswer:any
  questionForm: FormGroup;
  myDate: any = Date.now();

  public questionKey;
  public questionlist;
  public repliesList;
  public thequestion;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formbuilder: FormBuilder,public auth:AuthProvider,public DB:DbProvider)  {
    this.questionForm = formbuilder.group({question: ['', Validators.compose([Validators.required, Validators.minLength(3),Validators.maxLength(255)]) ]
  });

  this.questionKey = this.navParams.get('questionKey');
  console.log(this.questionKey)
  this.thequestion=[];
  this.questionKey = this.navParams.get('questionKey');
  this.questionlist = this.DB.getQuestion();
  this.questionlist.subscribe(questions=>{
    questions.forEach(question=>{
      if (question.$key == this.questionKey){
        this.thequestion = question;
      }
    })
  })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AskquestionlistPage');
  }

  thisanswer(){
    let doctor=this.auth.myuser.fname +" "+ this.auth.myuser.lname;
   
    this.newanswer = {
      answer: this.questionForm.value.question,
      by: doctor,
      at:this.myDate,
      sender:this.auth.myuser.email,
      ukey:this.auth.myuser.$key,
      akey:this.questionKey
    }
    this.DB.addAnswerQuestion(this.newanswer);

    this.answer="";
  }
}

