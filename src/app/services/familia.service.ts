import { Family } from './../models/familia.model';
import { Address } from './../models/address.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class FamiliaService {

  constructor(private http : HttpClient, private apiService: ApiService, private storage: Storage) { }


  // public getFamilia(): Observable<any> {
  public async getFamilia() {
    return this.apiService.api.get('/familia',{
      headers: {
        "Authorization": await this.storage.get('token')
      }
    })
      // return this.http.get(this.url);
  }

  public async createFamily(family:Family, address: Address) {
    const data = {family:{...family},address:{...address}}

    return this.apiService.api.post('/familia',data, {
      headers: {
        "Authorization": await this.storage.get('token')
      }
    })
    // console.log(data)
  }

  public async updateFamily(family: Family, address: Address) {
    const data = {family:{...family},address:{...address}}

    return this.apiService.api.put('/familia',data, {
      headers: {
        "Authorization": await this.storage.get('token')
      }
    })
  }


  // public createFamilia(request:Familia): Observable<Familia>{
  public async createFamilia(request:Family) {
    return this.apiService.api.post('/familia', request,{
      headers: {
        "Authorization": await this.storage.get('token')
      }
    })
      // return this.http.post<Familia>(this.url,request);
  }


  public async pesquisaNis(nis:number) {
    // TRY CATCH AQUI?
    return await this.apiService.api.get('/familia/nis/'+nis,{
      headers: {
        "Authorization": await this.storage.get('token')
      }
    });
    // return this.http.get(`http://10.20.30.113:3333/familia/nis/`+nis);
  }
  
}
