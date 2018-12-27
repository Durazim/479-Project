import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { AuthProvider } from '../../providers/auth/auth';
import { FirebaseListObservable } from 'angularfire2/database';
import { MedicationsFormPage } from '../medications-form/medications-form';
import { JsonPipe } from '@angular/common';

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
  public Names=[];
  public Prsc:FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public DB: DbProvider, public auth: AuthProvider) {
    this.Doctorlist = this.DB.getUsers();
    this.Doctorlist.subscribe(data => {
      data.forEach(doctor => {
        if ((doctor.email == this.auth.useremail) && (doctor.type == "Doctor")) {
          this.typeD = true;
          console.log(this.typeD);
        }
      });
    });

  }

  ionViewDidLoad() {
    this.flagCM=false;
    this.flagCM=this.navParams.data.flagCM;
    if(this.flagCM)
    {
      this.rKey=this.navParams.data.rKey;
      console.log(this.rKey);
    }
    else
    {
      this.rKey=this.DB.getUserKey();
      console.log(this.rKey);
    }
    this.PrscList=[];
    // this.PrscList=this.DB.getPrescriptions(this.rKey);
    // console.log(this.PrscList);
    this.Prsc=this.DB.getPrescriptions(this.rKey);
    this.Prsc.subscribe(P=>{
      console.log(P[0].by);
      // this.Names.push(this.DB.getUserName(P[0].by));
      P.forEach(element => {    
      this.DB.getUsers().subscribe (users => 
        { 
          users.forEach(user => 
          { 
            if(user.$key==element.by) 
            { 
              if(user.type=="Doctor")
                this.Names.push("Dr."+user.fname+" "+user.lname);
              else
                this.Names.push(user.fname+" "+user.lname);
            }
          }); 
        });
      }); 

      this.PrscList.push(P);
    });
    console.log(this.PrscList);  
    console.log(this.Names);
    console.log('ionViewDidLoad MedicationslistPage');
  }

  add()
  {
    console.log(this.PrscList);
    this.navCtrl.push(MedicationsFormPage,{rKey:this.rKey});
    // console.log(rKey);
  }

  BuyAlert()
  {    
    let alert = this.alertCtrl.create({
      title : 'Payment ' ,
      subTitle : 'The payment success' ,
      buttons: ['OK']
    });
    alert.present();
  }

}
