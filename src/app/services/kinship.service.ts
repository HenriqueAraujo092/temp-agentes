import { Injectable } from '@angular/core';
// import axios from 'axios';
import { NavController, MenuController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class KinshipService {


  constructor(private nav:NavController, 
              private storage: Storage, 
              private apiService: ApiService ) { 
  }

  public async getKinships() {
    return this.apiService.api.get('/kinship',{
        headers: {
          "Authorization": await this.storage.get('token')
        }
    })
  }

  

}
