import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { FavoritePage } from '../pages/favorite/favorite';
import { DoctorPage } from '../pages/doctor/doctor';
import { HealtheducationPage } from '../pages/healtheducation/healtheducation';
import { ChatlistPage } from '../pages/chatlist/chatlist';
import { MedicationslistPage } from '../pages/medicationslist/medicationslist';
import { MedicationsFormPage } from '../pages/medications-form/medications-form';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  // rootPage: any = ChatlistPage;
  pages: Array<{ title: string, component: any, icon: any }>;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public afAuth: AngularFireAuth, public auth: AuthProvider) {

    afAuth.authState.subscribe(
      user => {
        if (user) {
          this.auth.useremail = user.email;
          this.auth.logged = true;
          this.rootPage = HomePage;
        }
        else {
          this.rootPage = LoginPage;
        }
      });

    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'List', component: ListPage, icon: 'list' },
      { title: 'Profile', component: ProfilePage, icon: 'contact' },
      { title: 'My Favorite', component: FavoritePage, icon: 'heart' },
      { title: 'Doctor List', component: DoctorPage, icon: 'medkit' },
      { title: 'Chats', component: ChatlistPage, icon: 'send' },
      { title: 'Health Education', component: HealtheducationPage, icon: 'information-circle' },
      { title: 'My Medications', component: MedicationslistPage, icon: 'md-clipboard' }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.auth.logoutUser();

  }

  login() {
    this.nav.push(LoginPage)
  }
}
