import { Injectable } from '@angular/core';
// import axios from 'axios';
import { NavController, MenuController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  constructor(private nav:NavController, 
              private storage: Storage, 
              private menu : MenuController,
              private apiService: ApiService ) { 
  }

  public async getBooks() {
    return this.apiService.api.get('/books',{
        headers: {
          "Authorization": await this.storage.get('token')
        }
    })
  }

  public async getBook(id) {
    return this.apiService.api.get(`/book/${id}`,{
        headers: {
          "Authorization": await this.storage.get('token')
        }
    })
  }

  public async create(request) {
    return this.apiService.api.post(`/books`,request, {
        headers: {
          "Authorization": await this.storage.get('token')
        }
    })
  }
  

}
