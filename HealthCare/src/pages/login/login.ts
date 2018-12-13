import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController ,App} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public auth:AuthProvider,public alertCtrl: AlertController,public app:App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(username: string,password: string){
       this.auth.loginUser( username, password)
       .then( authData => {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'successful login',
          buttons: ['OK']
   });
   alert.present();
      this.app.getRootNav().setRoot(HomePage);
       }, error => {
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'Error',
          buttons: ['OK']
   });
   alert.present();
       });
    }


    register(){
      this.navCtrl.push(SignupPage)
    }
}
