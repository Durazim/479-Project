import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { DbProvider } from '../../providers/db/db';
import { AuthProvider } from '../../providers/auth/auth';
import { AskquestionlistPage } from '../askquestionlist/askquestionlist';

/**
 * Generated class for the QuestionlistfordoctorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-questionlistfordoctor',
  templateUrl: 'questionlistfordoctor.html',
})
export class QuestionlistfordoctorPage {
  public allquestions: FirebaseListObservable<any[]>;
  public questionlist = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,public DB:DbProvider,public auth:AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionlistfordoctorPage');
  }

  ionViewDidEnter() {
    this.questionlist = [];
    this.allquestions = this.DB.getQuestion();
    this.allquestions.subscribe(questions => {
      questions.forEach(question => {
           this.questionlist.push(question);
      })
    })
  }
  thisquestion(questionKey){
    this.navCtrl.push(AskquestionlistPage,{questionKey:questionKey})
  }
}
