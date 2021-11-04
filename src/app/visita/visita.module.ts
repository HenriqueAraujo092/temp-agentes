import { NavbarModule } from './../navbar/navbar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VisitaPage } from './visita.page';

const routes: Routes = [
  {
    path: '',
    component: VisitaPage
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
  declarations: [VisitaPage]
})
export class VisitaPageModule {}
