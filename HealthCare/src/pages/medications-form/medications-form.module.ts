import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicationsFormPage } from './medications-form';

@NgModule({
  declarations: [
    MedicationsFormPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicationsFormPage),
  ],
})
export class MedicationsFormPageModule {}
