import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController ,App} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public Eml = "";
  public Pas = "";
  
  public signForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider,public alertCtrl: AlertController,public app:App,public formBuilder: FormBuilder) {


    this.signForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('.+\@.+\..+')])],
      password: ['', Validators.compose([Validators.required])]

      });
  }

  ionViewDidLoad() {
    if(this.navParams.data.email!="" || this.navParams.data.password!="")
    {    
      this.Eml = this.navParams.data.email;
      this.Pas = this.navParams.data.password;
    }

    console.log('ionViewDidLoad LoginPage');
  }
  
  login(){
    if ( this.signForm.valid ){
    this.auth.loginUser( this.signForm.value.email, this.signForm.value.password)
       .then( authData => {
        let alert = this.alertCtrl.create({
          title: 'Logged',
          subTitle: 'successful login',
          buttons: ['OK']
   });
   this.navCtrl.setRoot(HomePage);
   //window.location.reload()
   
   alert.present();
       }, error => {
        let alert = this.alertCtrl.create({
          title: 'Error',
          subTitle: 'Email or Password is wrong',
          buttons: ['OK']
   });
   alert.present();
       });
    }
  }

    register(){
      this.navCtrl.push(SignupPage)
    }
    forgot(){
      this.navCtrl.push(ForgotPasswordPage);
    } 
}
