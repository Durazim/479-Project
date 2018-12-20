import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable } from 'angularfire2/database';
import { DbProvider } from '../../providers/db/db';
import { ViewDoctorDetailsPage } from '../view-doctor-details/view-doctor-details';

/**
 * Generated class for the DoctorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-doctor',
  templateUrl: 'doctor.html',
})
export class DoctorPage {

  Doctorlist: FirebaseListObservable<any[]>;
  arrayofdoctors=[];
  searched:any;
  result:any;
  list:any;
  flag:Boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public DB: DbProvider) {
    this.Doctorlist = this.DB.getUsers();
    //putting all info in arrayofdoctor
    this.Doctorlist.subscribe(data => {
      data.forEach(doctor => {
        if(doctor.type=="Doctor")
        this.arrayofdoctors.push(doctor);
      });
});

console.log(this.arrayofdoctors)

  this.initializeItems()

  }//end of constructor
  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorPage');
  }

  viewDoctorDetails(details){
    console.log(details);
    this.navCtrl.push(ViewDoctorDetailsPage,{data:details});
  }


  initializeItems() {
    this.searched=this.arrayofdoctors
  }

  getItems(ev: any) 
  {
    // Reset items back to all of the items
    this.initializeItems();

    let val = ev.target.value;
    
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') 
    {
      this.flag=true;
      this.result = this.searched.filter((doctor) => 
      {
        this.list = (((doctor.fname.toLowerCase()+" "+doctor.lname.toLowerCase())+doctor.phone.toLowerCase()+doctor.email.toLowerCase()).indexOf(val.toLowerCase()) > -1);
        return this.list;
      })
    }
    else
      this.flag=false;

    console.log(this.result);
  }
}
