
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public logged: boolean = false;
  user: Observable<firebase.User>;
  useremail:any="";
  constructor(public afAuth: AngularFireAuth) {
    this.user = this.afAuth.authState;
  }
  loginUser(newEmail: string, newPassword: string): Promise<any> {

    return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword)
  }

  logoutUser(): Promise<void> {

    return this.afAuth.auth.signOut().then(() => {
      this.logged = false;
      this.useremail="";
      window.location.reload();
    });
  }
  signupUser(newEmail: string, newPassword: string): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword
      (newEmail, newPassword);
  }
  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}  
