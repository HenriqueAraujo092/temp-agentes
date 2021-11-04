import { Injectable } from '@angular/core';
// import axios from 'axios';
import { NavController, MenuController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RevenueService {


  constructor(private nav:NavController, 
              private storage: Storage, 
              private menu : MenuController,
              private apiService: ApiService ) { 
  }

  public async getRevenues() {
      return this.apiService.api.get(`/revenue`,{
        headers: {
          "Authorization": await this.storage.get('token')
        }
    })
  }

}
