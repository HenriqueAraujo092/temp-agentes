import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'navapp',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(public nav:NavController,public menu:MenuController) { }

  ngOnInit() {}
  abrir(){
    this.menu.open('first');
    
  }
}
