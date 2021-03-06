import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-medications-form',
  templateUrl: 'medications-form.html',
})
export class MedicationsFormPage {
  public DescOfIll="";
  public medList = [
    {
      Name:"",
      TimesPerDay:1,
      Pic:"",
      until:"",
      price:0.0
    }
  ];

  public PharmaceuticalList:any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public DB: DbProvider, public alertCtrl: AlertController) {
    this.PharmaceuticalList=this.DB.getPharmaceuticals();
    console.log(this.PharmaceuticalList);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicationsFormPage');
  }
  
  changePrice(x,key)
  {
    this.medList[x].price=this.PharmaceuticalList[key-1].Price;
    this.medList[x].Pic=this.PharmaceuticalList[key-1].Pic;
    // console.log(this.medList[x].Pic);
  }

  addNewMed(){
    let index = this.medList.length-1;
    if(this.medList[index].Name!="" && this.medList[index].TimesPerDay>0 && this.medList[index].Pic!="" && this.medList[index].until!="" && this.medList[index].price>0.0)
      this.medList.push({Name:'',TimesPerDay:1,Pic:"",until:'',price:0.0});
    else
    {
      let alert = this.alertCtrl.create({
				title : 'Add Medicine' ,
        subTitle : 'Should complete the last Medicine details before add another one' ,
        buttons: ['OK']
      });
      alert.present();
    }
      console.log(this.medList[index]);
  }

  send()
  {
    let index = this.medList.length-1;
    if(this.DescOfIll!="")
      if(this.medList[index].Name!="" && this.medList[index].TimesPerDay>0 && this.medList[index].Pic!="" && this.medList[index].until!="" && this.medList[index].price>0.0)
        {
          let block={
            by:this.DB.getUserKey(),
            Desc:this.DescOfIll,
            medications:this.medList,
            date:Date.now()
          };
          console.log(block);
          let rKey=this.navParams.data.rKey;
          console.log(rKey);
          this.DB.pushPrescription(block,rKey);
        }
      else
      {
        let alert = this.alertCtrl.create({
          title : 'Send ' ,
          subTitle : 'Should complete the last Medicine details before add another one' ,
          buttons: ['OK']
        });
        alert.present();
      }
    else
    {
      let alert = this.alertCtrl.create({
        title : 'Send ' ,
        subTitle : 'Should describe the illness' ,
        buttons: ['OK']
      });
      alert.present();
    }
  }

}
