import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';

@IonicPage()
@Component({
  selector: 'page-medications-form',
  templateUrl: 'medications-form.html',
})
export class MedicationsFormPage {
  public DescOfIll="";
  public medList = [
    {
      Name:'',
      TimesPerDay:1,
      until:'',
      price:0.0
    }
  ];

  public PharmaceuticalList:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public DB: DbProvider) {
    this.PharmaceuticalList=this.DB.getPharmaceuticals();
    console.log(this.PharmaceuticalList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicationsFormPage');
  }

  addNewMed(){
    this.medList.push({Name:'',TimesPerDay:0,until:'',price:0.0});
  }

  send()
  {
    console.log(this.DescOfIll);
    console.log(this.medList);
  }

  changePrice(i,key)
  {
    console.log(this.PharmaceuticalList[key-1].Price);
    this.medList[i].price=this.PharmaceuticalList[key-1].Price;
    console.log(this.medList[i].price);
  }
}
