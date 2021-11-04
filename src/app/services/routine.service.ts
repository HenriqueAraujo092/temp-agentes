import { Injectable } from '@angular/core';
// import axios from 'axios';
import { NavController, MenuController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoutineService {


  constructor(private nav:NavController, 
              private storage: Storage, 
              private apiService: ApiService ) { 
  }

  public async getRoutines() {
    return this.apiService.api.get('/routine',{
        headers: {
          "Authorization": await this.storage.get('token')
        }
    })
  }

  

}
