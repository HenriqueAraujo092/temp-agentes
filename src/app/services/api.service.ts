import { Injectable } from '@angular/core';
import axios from 'axios';
import { NavController, MenuController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { AppComponent } from '../app.component'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api = axios.create({
      baseURL: 'http://172.18.3.50:3333',
  });

  constructor(private nav:NavController, 
              private storage: Storage, 
              private menu : MenuController ) { 

    // interceptador caso seja status 401(nao autorizado), tira o usuario da aplicação para re-fazer o login
    this.api.interceptors.response.use(response => {
      return response;
    }, async error => {
        if(error.response.status === 401) {
            alert("Sessão expirada, faça login novamente")

            //este codigo é o mesmo de app.component.ts/logout
            await this.storage.remove("id_agente");
            await this.storage.remove("nome_agente");
            await this.storage.remove("token");
            await this.storage.set("reload",true);
            this.menu.close('first');


            this.nav.navigateRoot("/login");
            return error;
        }
        return error;
    })

  }

  // async getApiInstance() {
  //   this.api.defaults.headers.common['Authorization'] = await this.storage.get('token');
  //   return this.api;
  // }

  // async setup() {
  //   this.api.defaults.headers.common['Authorization'] = await this.storage.get('token'); 
  // }

  // public static setup = async () => {
  //     const me = new MyClass();

  //     me.mMember = await SomeFunctionAsync();

  //     return me;
  // };

  

}
