import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseListObservable } from 'angularfire2/database';
import { MedicationsFormPage } from '../medications-form/medications-form';

@IonicPage()
@Component({
  selector: 'page-medicationslist',
  templateUrl: 'medicationslist.html',
})
export class MedicationslistPage {
  public Doctorlist: FirebaseListObservable<any[]>;
  public typeD:Boolean=false;
  public flagCM:Boolean=false;
  public rKey:any="";
  public PrscList:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public DB: DbProvider, public auth: AuthProvider) {
    this.Doctorlist = this.DB.getUsers();
    this.Doctorlist.subscribe(data => {
      data.forEach(doctor => {
        if ((doctor.email == this.auth.useremail) && (doctor.type == "Doctor")) {
          this.typeD = true;
          console.log(this.typeD);
        }
      });
    });
    
    this.flagCM=this.navParams.data.flagCM;
    if(this.flagCM)
    {
      this.rKey=this.navParams.data.rKey;
      // console.log(rKey);
    }
    else
    {
      let rKey=this.DB.getUserKey();
      // console.log(rKey);
    }
    this.PrscList=[];
    this.PrscList=this.DB.getPrescriptions(this.rKey);
    console.log(this.PrscList);
  }

  ionViewDidLoad() {
    this.flagCM=false;
    this.flagCM=this.navParams.data.flagCM;
    if(this.flagCM)
    {
      this.rKey=this.navParams.data.rKey;
      // console.log(rKey);
    }
    else
    {
      let rKey=this.DB.getUserKey();
      // console.log(rKey);
    }
    this.PrscList=[];
    this.PrscList=this.DB.getPrescriptions(this.rKey);
    console.log(this.PrscList);
    console.log('ionViewDidLoad MedicationslistPage');
  }

  add()
  {
    console.log(this.PrscList);
    this.navCtrl.push(MedicationsFormPage,{rKey:this.rKey});
    // console.log(rKey);
  }

}
