import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyquestionsPage } from './myquestions';

@NgModule({
  declarations: [
    MyquestionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyquestionsPage),
  ],
})
export class MyquestionsPageModule {}
