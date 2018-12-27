import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { FirebaseListObservable } from 'angularfire2/database';

/**
 * Generated class for the ThequestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-thequestion',
  templateUrl: 'thequestion.html',
})
export class ThequestionPage {
  public questionKey
  public myQuestions;
  public question;
  public repliesList:FirebaseListObservable<any[]>;
  public answerlist:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public DB:DbProvider) {
    this.questionKey = this.navParams.get('questionKey');
    console.log(this.questionKey)
  
    this.myQuestions = this.DB.getQuestion();
    this.myQuestions.subscribe(questions=>{
      questions.forEach(question=>{
        if (question.$key == this.questionKey){
          this.question = question;
        }
      })
    })


    this.repliesList = this.DB.getQuestionAnswers();
    this.repliesList.subscribe(data=>{
      data.forEach(answer=>{
        if (answer.akey == this.questionKey){
          this.answerlist.push(answer)
        }
      })
      console.log(this.answerlist)
    })
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThequestionPage');
  }

}
