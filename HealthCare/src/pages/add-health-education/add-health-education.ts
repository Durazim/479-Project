import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbProvider } from '../../providers/db/db';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseListObservable } from 'angularfire2/database';


/**
 * Generated class for the AddHealthEducationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-health-education',
  templateUrl: 'add-health-education.html',
})
export class AddHealthEducationPage {
  public topics = ["General", "Natural Disasters", "Food", "Skin", "Disease", "others"];
  myDate: string= new Date().toString();
  public healthForm: FormGroup;
  public docEmail: any;
  public HealEdu= {email:'',fname:'',lname:'',topic:'',title:'',description:'',publishedtime:''};
  
  public Doctorlist: FirebaseListObservable<any[]>;
  public doc = [];
  public mydoc: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public DB: DbProvider, public afAuth: AngularFireAuth) {
    this.healthForm = formBuilder.group({
      selectedtopic: ['', Validators.compose([Validators.required])],
      topictitle: ['', Validators.compose([Validators.required])],
      topicdesc: ['', Validators.compose([Validators.required])]
    });

      //this will get who is the user logged in
    this.afAuth.authState.subscribe(user => {this.docEmail = user.email; });
    //i want  the information of the doctor who is logged in so i can put the name of the doctor+other info in a variable then use it in the other page
    this.Doctorlist = this.DB.getdoctor();
    this.Doctorlist.subscribe(data => {
      data.forEach(doctor => {
        this.doc.push(doctor);
      });
      for (var i = 0; i < this.doc.length; i++) {
        if (this.doc[i].email.toLowerCase() == this.docEmail) {

          this.mydoc = this.doc[i]
        }
      }
      
      console.log(this.myDate)
    });

  }//end of constructor
  ionViewDidLoad() {

  }
  HE(){
    
    this.HealEdu.email=this.mydoc.email;
    this.HealEdu.fname=this.mydoc.fname;
    this.HealEdu.lname=this.mydoc.lname;
    this.HealEdu.publishedtime=this.myDate; 

 this.DB.AddHealthEducation(this.HealEdu)

  }
}





