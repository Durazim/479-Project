import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { SignupPage } from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { StatusBar } from '@ionic-native/status-bar';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';

//providers
import { AuthProvider } from '../providers/auth/auth';
import { DbProvider } from '../providers/db/db';

//FireBase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


const firebaseConfig = {
  apiKey: "AIzaSyC8RAV4QNKF9YQx2X-UTqlcA3Q53MvVZ6w",
  authDomain: "itcs479-healthcare.firebaseapp.com",
  databaseURL: "https://itcs479-healthcare.firebaseio.com",
  projectId: "itcs479-healthcare",
  storageBucket: "itcs479-healthcare.appspot.com",
  messagingSenderId: "624877728691"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    ProfilePage,
    ForgotPasswordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
      // initialize angularfire with credentials from the dashboard
      AngularFireModule.initializeApp(firebaseConfig),
      // Import the AngularFireDatabaseModule to use database
      AngularFireDatabaseModule,
      AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    ProfilePage,
    ForgotPasswordPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthProvider,
    DbProvider
  ]
})
export class AppModule { }
