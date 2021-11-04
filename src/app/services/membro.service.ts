import { Membro } from './../models/membro.model';
// import { Familia } from '../models/familia.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class MembroService {

  private url = "http://10.20.30.113:3333/familia/";


  constructor(private http : HttpClient, private apiService: ApiService,private storage: Storage) { }

  // public async getMembro(nis:number): Observable<any>  {
  public async getMembro(nis:number) {
    return await this.apiService.api.get(`/familia`+nis+`/membro`,{
      headers: {
        "Authorization": await this.storage.get('token')
      }
    })
      // return this.http.get(`http://10.20.30.113:3333/familia`+nis+`/membro`);
  }

  public async getMember(memberId) {
    return await this.apiService.api.get(`member/${memberId}`,{
      headers: {
        "Authorization": await this.storage.get('token')
      }
    })
  }

  public async updateMember(request) {
    return await this.apiService.api.put(`member/`, request, {
      headers: {
        "Authorization": await this.storage.get('token')
      }
    })
  }


  // public criarMembro(request:Membro,id): Observable<Membro>{
  public async criarMembro(request , id) {
    return await this.apiService.api.post(`familia/`+id+`/membro`, request,{
      headers: {
        "Authorization": await this.storage.get('token')
      }
    })
      // return this.http.post<Membro>(`http://10.20.30.113:3333/familia/`+id+`/membro`,request);
  }

  // public getMembros(id:number): Observable<any>  {
  public async getMembros(id:number) {
    return await this.apiService.api.get(`/familia/`+id+`/membro`,{
      headers: {
        "Authorization": await this.storage.get('token')
      }
    });
    // return this.http.get(`http://10.20.30.113:3333/familia/`+id+`/membro`);
}
  
}
