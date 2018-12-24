import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MedicationslistPage } from './medicationslist';

@NgModule({
  declarations: [
    MedicationslistPage,
  ],
  imports: [
    IonicPageModule.forChild(MedicationslistPage),
  ],
})
export class MedicationslistPageModule {}
