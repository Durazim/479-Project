import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup } from '@angular/forms';
import {AuthProvider} from '../../providers/auth/auth';


/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {
  public resetPasswordForm: FormGroup;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public formBuilder: FormBuilder, public navParams: NavParams,public auth :AuthProvider) {
   this.resetPasswordForm = formBuilder.group({
     email: ['',Validators.compose([Validators.required,  Validators.pattern('.+\@.+\..+')])],
   });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  resetPassword(){
    if (!this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value);
    } else {
      this.auth.resetPassword(this.resetPasswordForm.value.email)
      .then((user) => {
        let alert = this.alertCtrl.create({
          message: "Reset password has been sent to your Email",
          buttons: [
            {
              text: "Ok",
              role: 'cancel',
              handler: () => { this.navCtrl.pop(); }
            }
          ]
        });
        alert.present();

      }, (error) => {
        var errorMessage: string = error.message;
        let errorAlert = this.alertCtrl.create({
          message: errorMessage,
          buttons: [{ text: "Ok", role: 'cancel' }]
        });
        errorAlert.present();
      });
    }
  }

  login(){
    this.navCtrl.pop();
  }
}

