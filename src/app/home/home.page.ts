import { MenuController } from "@ionic/angular";
import { AgenteService } from "./../services/agente.service";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
// import { Agente } from "../models/agente.model";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  reload: boolean = true;
  nome: string;
  funcaoUser: string = "Agente de leitura";

  constructor(
    private agtService: AgenteService,
    public router: Router,
    public menu: MenuController
  ) {}

  async ngOnInit() {
    let nomeAgente = await this.agtService.pegarStorage("nome_agente");
    this.nome = nomeAgente;


    // this.agtService.pegarStorage("nome_agente").then(val => {
    //   this.nome = val;
    //   this.agtService.pegarStorage("reload").then(val => {
    //     if (val == true) {
    //       this.agtService.reloadd();
    //       window.location.reload();
    //     }
    //   });
    // });

    this.menu.swipeEnable(true);
  }
}
