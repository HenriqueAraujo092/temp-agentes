import { NavbarModule } from './../navbar/navbar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PesqVisitaPage } from './pesq-visita.page';

const routes: Routes = [
  {
    path: '',
    component: PesqVisitaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavbarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PesqVisitaPage]
})
export class PesqVisitaPageModule {}
