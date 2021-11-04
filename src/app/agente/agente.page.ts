import { AlertController, NavController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { Agente } from "../models/agente.model";
import { AgenteService } from "../services/agente.service";

@Component({
  selector: "app-agente",
  templateUrl: "./agente.page.html",
  styleUrls: ["./agente.page.scss"]
})
export class AgentePage implements OnInit {
  agente: Agente ={
    nome: "",
    cpf: "",
    rg: "",
    telefone: "",
    rua: "",
    numero: "",
    cep: "",
    bairro: "",
    cidade: "",
    banco: "",
    agencia: "",
    numero_conta: "",
    tipo_conta: "",
    whatsapp: "",
    email: "",
    facebook: "",
    instagram: "",
    twitter: ""
  };

  agent: any = {}
  address: any = {}
  neighborhood: any = ""
  city: any = ""

  constructor(
    public alertController: AlertController,
    public nav: NavController,
    public agSer: AgenteService
  ) {}

    async iniciar(){

      const userObj = await this.agSer.pegarStorage("userObj");

      this.agent = userObj.agent;
      this.address = userObj.agent.address;
      this.neighborhood = userObj.agent.address.neighborhood;
      this.city = userObj.agent.address.city;

      console.log(this.agent)

      // if (agente) {
      //   this.agente = agente;
      // }

      // this.agSer.pegarStorage("id_agente").then(val => {
      //   this.agSer.pegar(val).subscribe((data: any) => {
      //     this.agente = data;
      //   });
      // });

    }


  ngOnInit() {
    this.iniciar();
  }
}
