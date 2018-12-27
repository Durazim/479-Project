import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { AuthProvider } from '../../providers/auth/auth';
import { DbProvider } from '../../providers/db/db';
import { ThequestionPage } from '../thequestion/thequestion';

/**
 * Generated class for the MyquestionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myquestions',
  templateUrl: 'myquestions.html',
})
export class MyquestionsPage {
  public allquestions: FirebaseListObservable<any[]>;
  public questionlist = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public DB: DbProvider) {
  }

  ionViewDidEnter() {
    this.questionlist = [];
    this.allquestions = this.DB.getQuestion();
    this.allquestions.subscribe(questions => {
      questions.forEach(question => {
        if (question.ukey == this.auth.myuser.$key) {

          this.questionlist.push(question);
        }
      })
    })
  }

thisquestion(qkey){
  this.navCtrl.push(ThequestionPage , {questionKey : qkey});
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyquestionsPage');
  }

}
