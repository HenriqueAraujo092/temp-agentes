import { Visita } from "./../models/visita.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { ApiService } from './api.service';

@Injectable({
  providedIn: "root"
})
export class VisitaService {
  constructor(private http: HttpClient, private apiService: ApiService, private storage: Storage) {}

  // public createVisita(request: Visita, nis): Observable<Visita> {
  public async createVisita(request , nis) {
    return this.apiService.api.post(`/visita/nis/` + nis, request,{
      headers: {
        "Authorization": await this.storage.get('token')
      }
    })

  }

  public async delete(id: number) {
    return await this.apiService.api.delete(`/visita/${id}`,{
      headers: {
        "Authorization": await this.storage.get('token')
      }
    });
  }

  public async pesquisaNis(nis: number) {
    return await this.apiService.api.get(`/visita/nis/` + nis,{
      headers: {
        "Authorization": await this.storage.get('token')
      }
    });

  }
}
