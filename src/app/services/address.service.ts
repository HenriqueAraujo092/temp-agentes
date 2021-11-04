import { Injectable } from '@angular/core';
// import axios from 'axios';
import { NavController, MenuController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {


  constructor(private nav:NavController, 
              private storage: Storage, 
              private menu : MenuController,
              private apiService: ApiService ) { 
  }

  public async createAddress(request) {
    return this.apiService.api.post('/address', request,{
        headers: {
          "Authorization": await this.storage.get('token')
        }
    })
  }

  public async getStates() {
    return this.apiService.api.get('/state',{
        headers: {
          "Authorization": await this.storage.get('token')
        }
    })
  }

  public async getCitiesFromState(stateId) {
    return this.apiService.api.get(`/state/cities/${stateId}`,{
        headers: {
          "Authorization": await this.storage.get('token')
        }
    })
  }

  public async getNeighborhoodsFromCity(cityId) {
    return this.apiService.api.get(`/city/neighborhoods/${cityId}`,{
        headers: {
          "Authorization": await this.storage.get('token')
        }
    })
  }

  

}
