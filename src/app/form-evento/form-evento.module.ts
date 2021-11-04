import { NavbarModule } from './../navbar/navbar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FormEventoPage } from './form-evento.page';

const routes: Routes = [
  {
    path: '',
    component: FormEventoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NavbarModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FormEventoPage]
})
export class FormEventoPageModule {}
