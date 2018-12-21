import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { ChatPage } from '../chat/chat';
import { DoctorPage } from '../doctor/doctor';
import { DbProvider } from '../../providers/db/db';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseListObservable } from 'angularfire2/database';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@IonicPage()
@Component({
  selector: 'page-view-doctor-details',
  templateUrl: 'view-doctor-details.html',
})
export class ViewDoctorDetailsPage {
  liked = false;
  doctor: any;
  user: any;
  email: any = "";
  newcomment: any;
  addedcomment: any = "";
  public comment: FirebaseListObservable<any[]>;
  public commentlist = [];
  public commentForm: FormGroup;
  displaycomment:any;
  public Users: FirebaseListObservable<any[]>;
  public therealdoc:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public DB: DbProvider, public auth: AuthProvider, public formBuilder: FormBuilder) {
    this.doctor = this.navParams.get('data');
    console.log(this.doctor);

    this.commentForm = formBuilder.group({
      thecomment: ['', Validators.compose([Validators.required])]
    });

    this.afAuth.authState.subscribe(user => {
      this.user = user;
      if (user)
        this.email = user.email;
    });

    //get comments
    this.comment = this.DB.getComment();
    this.comment.subscribe(data => {
      data.forEach(com => {
        if ((com.doctoremail == this.doctor.email)) {
          this.commentlist.push(com);
        }
      });
    });

       if(this.doctor.email==this.auth.useremail){
         this.therealdoc=true;
         console.log(this.doctor.email)
         console.log(this.auth.useremail)
         console.log(this.therealdoc)
       }


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewDoctorDetailsPage');
  }

  initializeItems() {
    this.commentlist=[];
  }

  chat() {
    this.navCtrl.push(ChatPage, { d: this.doctor.$key });
  }

  favorite() {
    alert("this is just a fake fav for now :)")
  }

  addNewComment() {
    this.initializeItems();

    this.newcomment = {
      comment: this.commentForm.value.thecomment,
      user: this.auth.useremail,
      doctoremail: this.doctor.email
    }

    this.DB.addComment(this.newcomment);

this.addedcomment="";
  }

  deletecomment(mycomment,key){

    this.DB.deleteaComments(mycomment, key);
  }
}