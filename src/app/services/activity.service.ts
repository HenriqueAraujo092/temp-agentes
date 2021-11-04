import { Injectable } from '@angular/core';
// import axios from 'axios';
import { NavController, MenuController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {


  constructor(private nav:NavController, 
              private storage: Storage, 
              private menu : MenuController,
              private apiService: ApiService ) { 
  }

  public async getActivities() {
    return this.apiService.api.get('/activities',{
        headers: {
          "Authorization": await this.storage.get('token')
        }
    })
  }

  

}
