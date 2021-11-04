import { NavbarModule } from './../navbar/navbar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PesqFamiliaPage } from './pesq-familia.page';

const routes: Routes = [
  {
    path: '',
    component: PesqFamiliaPage
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
  declarations: [PesqFamiliaPage]
})
export class PesqFamiliaPageModule {}
