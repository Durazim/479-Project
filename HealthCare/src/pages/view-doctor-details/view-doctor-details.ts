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

  doctor: any;
  user: any;
  email: any = "";

  newcomment: any;
  addedcomment: any = "";
  public comment: FirebaseListObservable<any[]>;
  public commentlist = [];
  public commentForm: FormGroup;

  ukey:any;

  public Users: FirebaseListObservable<any[]>;
  public therealdoc: boolean = false;

  liked :boolean=false;
  public newfavorite: any;
  public fav: FirebaseListObservable<any[]>;
  public favlist: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public DB: DbProvider, public auth: AuthProvider, public formBuilder: FormBuilder) {
    this.doctor = this.navParams.get('data');
    console.log(this.doctor);
    this.ukey=this.DB.getUserKey();
    this.afAuth.authState.subscribe( user => {  this.user = user;
      if (user)
        this.email = user.email;
    });

    this.commentForm = formBuilder.group({
      thecomment: ['', Validators.compose([Validators.required])]
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

    //only logged doctor can only delete the comments under him 
    if (this.doctor.email == this.auth.useremail) {
      this.therealdoc = true;
      console.log(this.doctor.email)
      console.log(this.auth.useremail)
      console.log(this.therealdoc)
    }

    //to get the fav
    this.fav = this.DB.getFavorite();
    this.fav.subscribe(data => {
      data.forEach(favoriates => {
        if ((favoriates.user == this.auth.useremail) && (favoriates.doctoremail == this.doctor.email)) {

          this.favlist = favoriates;
          this.liked = favoriates.stats
          console.log( this.favlist.$key)
        }

      })
    })


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewDoctorDetailsPage');
  }

  chat(){
    let Dname;
    if(this.doctor.type=="Doctor")
      Dname = "Dr."+this.doctor.fname+" "+this.doctor.lname;
    else
      Dname = this.doctor.fname+" "+this.doctor.lname;

    this.navCtrl.push(ChatPage,{d:this.doctor.$key,n:Dname,flagCL:false});
  }
  initializeItems() {
    this.commentlist = [];
  }

  favorite() {
    if (this.liked == false) {
      this.newfavorite = {
        stats: true,
        user: this.auth.useremail,
        doctoremail: this.doctor.email,
        docfname:this.doctor.fname,
        doclname:this.doctor.lname,
        docimage:this.doctor.image
      }
      this.DB.addFavorite(this.newfavorite);
      this.liked = true;

    }
    else {
      this.DB.deleteFavorite(this.favlist.$key)
      this.liked = false;
    }
  }

  addNewComment() {
    this.initializeItems();

    this.newcomment = {
      comment: this.commentForm.value.thecomment,
      user: this.auth.useremail,
      doctoremail: this.doctor.email
    }

    this.DB.addComment(this.newcomment);

    this.addedcomment = "";
  }

  deletecomment(mycomment, key) {

    this.DB.deleteaComments(mycomment, key);
  }


}
