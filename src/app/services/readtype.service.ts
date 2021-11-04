import { Injectable } from '@angular/core';
// import axios from 'axios';
import { NavController, MenuController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReadTypeService {


  constructor(private nav:NavController, 
              private storage: Storage, 
              private apiService: ApiService ) { 
  }

  public async getReadTypes() {
    return this.apiService.api.get('/readtype',{
        headers: {
          "Authorization": await this.storage.get('token')
        }
    })
  }

  

}
