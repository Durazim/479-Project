import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewDoctorDetailsPage } from './view-doctor-details';

@NgModule({
  declarations: [
    ViewDoctorDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewDoctorDetailsPage),
  ],
})
export class ViewDoctorDetailsPageModule {}
