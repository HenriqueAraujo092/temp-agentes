import { Injectable } from '@angular/core';
// import axios from 'axios';
import { NavController, MenuController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DeficiencyService {

  constructor(private nav:NavController, 
    private storage: Storage, 
    private apiService: ApiService ) { 
  }

  public async getDeficiencies() {
    return this.apiService.api.get('/deficiency',{
      headers: {
      "Authorization": await this.storage.get('token')
      }
    })
  }
}
