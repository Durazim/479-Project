import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { DbProvider } from '../../providers/db/db';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  newaccount: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public formBuilder: FormBuilder,public alertCtrl: AlertController,public DB:DbProvider,public auth:AuthProvider) {
    this.signupForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('.+\@.+\..+')])],
      fname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(30)])],
      lname: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(30)])],
      phone:  ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(8), Validators.maxLength(8)])],
      CPR:  ['', Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(9), Validators.maxLength(9)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8),Validators.pattern('.*[A-Z]+.*[a-z]+.*')])]

      });
    }//end of constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  register(){
    if ( this.signupForm.valid )
    {
      this.newaccount = {
        email: this.signupForm.value.email,
        fname: this.signupForm.value.fname,
        lname: this.signupForm.value.lname,
        CPR:this.signupForm.value.CPR,
        phone:this.signupForm.value.phone
      };
      this.auth.signupUser(this.signupForm.value.email,this.signupForm.value.password).then( ()=> {
       this.DB.addUserToDB(this.newaccount);
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'Registered successfuly',
          buttons: ['OK']
          });
          alert.present();
     })
    }//end of if
  }//end of register

  login() {
   this.navCtrl.pop() 
  }


  
  
}
