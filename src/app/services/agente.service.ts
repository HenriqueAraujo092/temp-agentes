import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Storage } from "@ionic/storage";
import { Agente } from "../models/agente.model";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root"
})
export class AgenteService {
  constructor(private http: HttpClient, 
              private storage: Storage, 
              private apiService: ApiService) {}

  // public async login(cpf: string): Observable<any> {
  public async login(cpf: string) {
    return await this.apiService.api.get('/login/'+ cpf);
    // return this.http.get(`http://10.20.30.113:3333/login/` + cpf);
  }

  public async pegar(id:number){
    try {

      const res = await this.apiService.api.get(`/pegar/` + id,{
        headers: {
          "Authorization": await this.storage.get('token')
        }
      });
      return res.data;

    } catch (err) {
      
      console.log(err);

    }

    // return this.http.get(`http://10.20.30.113:3333/pegar/` + id);
  }

  public async criarStorage(key:number, nome:string, bearerToken: string, userObj) {
    await this.storage.set("id_agente", key);
    await this.storage.set("nome_agente", nome);
    await this.storage.set("token", bearerToken);
    await this.storage.set("userObj", userObj);
    await this.storage.set("reload", true);

    // only affects the global instance and instances created afterwards
    // api.defaults.headers.common['Authorization'] = await this.storage.get('token'); 
    // this.apiService.api.defaults.headers.common['Authorization'] = await this.storage.get('token'); 
  }

  public pegarStorage(key:string) : any {
    return this.storage.get(key);
  }

  async remover() {
    await this.storage.remove("id_agente");
    await this.storage.remove("nome_agente");
    await this.storage.remove("token");
    await this.storage.set("reload",true);
  }

  public reloadd() : any {
    return this.storage.set('reload',false);
  }
}
