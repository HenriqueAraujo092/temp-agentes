import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: "root"
})
export class EventoService {
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private storage: Storage
    ) {}

  // public createEvento(request: any): Observable<any> {
  public async createEvento(request: any) {
    return await this.apiService.api.post('/evento', request,{
      headers: {
        "Authorization": await this.storage.get('token')
      }
    });
  }

  public async updateEvento(request: any) {
    return this.apiService.api.put('/evento', request, {
      headers: {
        "Authorization": await this.storage.get('token')
      }
    })
  }

  public async getEvent(eventId) {
    return await this.apiService.api.get(`/event/${eventId}`,{
      headers: {
        "Authorization": await this.storage.get('token')
      }
    });
  }

  public async listarEventos() {
    try {

      // const res = await api.get('/evento');
      const res = await this.apiService.api.get('/evento',{
        headers: {
          "Authorization": await this.storage.get('token')
        }
      });
      return res.data;

    } catch (err) {
      
      console.log(err);

    }
    

    // return this.http.get(`http://10.20.30.113:3333/evento`);
    // api.defaults.headers['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.SKgNy_LSDq7HYpP5as1k3VpwX8rkOos6dRMuTn4_9-Q';
    // const res = await api.get('/evento', {
    //   headers: {
    //     "Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.SKgNy_LSDq7HYpP5as1k3VpwX8rkOos6dRMuTn4_9-Q'
    //   }
    // });
    
    // console.log(res);
    // return false;
    // return await api.get('/evento')
  }

}
