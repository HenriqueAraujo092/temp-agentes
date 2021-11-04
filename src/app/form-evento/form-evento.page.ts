import { AgenteService } from './../services/agente.service';
import { AlertController, NavController } from "@ionic/angular";
import { EventoService } from "./../services/evento.service";
import { Evento } from "./../models/evento.model";
import { Component, OnInit } from "@angular/core";
import { AddressService } from "./../services/address.service";
import { Address } from "./../models/address.model";
import axios from 'axios';
import { Router, ActivatedRoute } from '@angular/router';
import dateFormat from 'dateformat';

@Component({
  selector: "app-form-evento",
  templateUrl: "./form-evento.page.html",
  styleUrls: ["./form-evento.page.scss"]
})
export class FormEventoPage implements OnInit {

  ocultar: boolean = false;

  constructor(
    public alert: AlertController,
    public eventoService: EventoService,
    public nav: NavController,
    public agtService : AgenteService,
    private addressService: AddressService,
    public activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  vazio = true;
  evento: Evento = {
    nome_evento: "",
    local: "",
    hora: "",
    data: new Date(),
    endereco: "",
    descricao: "",
    link_imagens:"",
    agente_nome:""
  };

  event : any = {
    name: "",
    date: "",
    hour: "",
    place: "",
    description: "",
    image_link: "",
    agent_id: ""
  }

  cep: ""
  complement: ""
  logradouro: ""
  number: ""

  cepRequest;

  states;
  cities;
  neighborhoods;

  selectedState;
  selectedCity;
  selectedNeighborhood;

  eventIdAlreadyExists;
  eventObjAlreadyExists; //objeto da familia que veio para ser atualizada

  async ngOnInit() {
   
    this.getStates();

    this.event.agent_id = await this.agtService.pegarStorage("id_agente");

    this.agtService.pegarStorage("nome_agente").then(val => {
        this.evento.agente_nome = val;
    });

    this.verifyIfIsEdit();
  }

  //verifica se existe o parametro 'eventId" na navegação, com isso a tela torna-se a tela de editar
  async verifyIfIsEdit() {
    this.eventIdAlreadyExists = this.activatedRoute.snapshot.paramMap.get("eventId");

    if(this.eventIdAlreadyExists) {
      
      let resp = await this.eventoService.getEvent(this.eventIdAlreadyExists);
      const event = resp.data;
      this.eventObjAlreadyExists = event;

      await this.getCitiesFromState( {detail: {value:""+event.address.state_id}} )
      await this.getNeighborhoodsFromCity( {detail: {value:""+event.address.city_id}} )
      
      this.complement = event.address.complement;
      this.cep = event.address.cep;
      this.logradouro = event.address.logradouro;
      this.number = event.address.number;
      this.selectedState = ""+event.address.state_id;
      this.selectedCity = ""+event.address.city_id;
      this.selectedNeighborhood = ""+event.address.neighborhood_id;

      this.event.name = event.name;
      this.event.date = dateFormat(new Date(event.date), "yyyy-mm-dd");
      this.event.hour = event.hour;
      this.event.place = event.place;
      this.event.description = event.description;
      this.event.image_link = event.image_link;


    } 

  }

  async updateEvent() {

    if( 
      !this.event.name ||
      !this.event.date ||
      !this.event.hour ||
      !this.event.place ||
      !this.event.description ||
      // !this.event.image_link ||
      !this.selectedState ||
      !this.selectedCity ||
      !this.selectedNeighborhood ||
      !this.cep ||
      !this.logradouro ||
      !this.number ||
      !this.complement
    ) {
      this.alertErro();
      return false;
    } 

    const address : Address = {
      complement: this.complement,
      cep: this.cep,
      city_id: this.selectedCity,
      logradouro: this.logradouro,
      neighborhood_id: this.selectedNeighborhood,
      number: this.number,
      state_id: this.selectedState
    }

    this.event = { ...this.event, id: this.eventObjAlreadyExists.id }
    const data = {event:{...this.event},address:{...address}}

    const event = await this.eventoService.updateEvento(data);

    if(event.data.error) {
      alert(event.data.error)
      return false;
    }

    if(event) {
      this.alertSuccess();
    }
  }

  async findCep() {
    this.selectedState = "";
    this.selectedCity = "";
    this.selectedNeighborhood = "";
    //Nova variável "cep" somente com dígitos.
    var cep = this.cep.replace(/\D/g, '');

    const cepRequest = await axios.get(`http://viacep.com.br/ws/${cep}/json/`);
    this.cepRequest = cepRequest;

    this.selectedState = ""+this.states.find(x => x.uf === cepRequest.data.uf).id;
    this.logradouro = cepRequest.data.logradouro ? cepRequest.data.logradouro : ""

  }
  

  create() {
    const address : Address = {
      complement: this.complement,
      cep: this.cep,
      city_id: this.selectedCity,
      logradouro: this.logradouro,
      neighborhood_id: this.selectedNeighborhood,
      number: this.number,
      state_id: this.selectedState
    }

    if( 
      !this.event.name ||
      !this.event.date ||
      !this.event.hour ||
      !this.event.place ||
      !this.event.description ||
      // !this.event.image_link ||
      !this.selectedState ||
      !this.selectedCity ||
      !this.selectedNeighborhood ||
      !this.cep ||
      !this.logradouro ||
      !this.number ||
      !this.complement
    ) {
      this.alertErro();
      return false;
    } 

    const data = {event:{...this.event},address:{...address}}

    this.eventoService.createEvento(data).then(
      (resp) => {
        console.log("alertSuccess");
        this.alertSuccess();
      },
      error => {
        console.log("alertErro");
        this.alertErro();
      }
    );

  }


  
  async alertErro() {
    const alert = await this.alert.create({
      header: "Não foi possivel concluir o cadastro",
      subHeader: "Verifique os campos",
      mode: "md",
      buttons: ["Ok"]
    });

    await alert.present();
  }
  async alertSuccess() {
    const alert = await this.alert.create({
      header: "Procedimento realizado com sucesso",
      mode: "md",
      buttons: [
        {
          text: "Ok",
          cssClass: "secondary",
          handler: async () => {
            // this.nav.navigateBack("/evento");
            await this.router.navigate(['/evento']);
          }
        }
      ]
    });

    await alert.present();
  }

  cadastrar() {

    this.eventoService.createEvento(this.evento).then(
      (resp) => {
        this.alertSuccess();
      },
      error => {
        this.alertErro();
      }
    );

    // this.eve.createEvento(this.evento).subscribe(
    //   (data: any) => {
    //     this.alertSuccess();
    //   },
    //   error => {
    //     this.alertErro();
    //   }
    // );

  }

  async getStates() {
    const states = await this.addressService.getStates();
    this.states = states.data;
  }

  async getCitiesFromState(event) {
    if(!event.detail.value) {
      return false;
    }

    const cities = await this.addressService.getCitiesFromState(event.detail.value);
    this.cities = cities.data.cities;

    if(this.cepRequest) {
      this.selectedCity = ""+this.cities.find(x => x.name === this.cepRequest.data.localidade).id; 
      this.getNeighborhoodsFromCity(  { detail: { value: this.selectedCity } } )
    }
  }

  async getNeighborhoodsFromCity(event) {
    if(!event.detail.value) {
      return false;
    }

    const neighborhoods = await this.addressService.getNeighborhoodsFromCity(event.detail.value);
    this.neighborhoods = neighborhoods.data.neighborhoods;

    if(this.cepRequest) {
      let neighborhoodFromRequestCep = this.cepRequest.data.bairro;
      let neighborhoodFromRequestCepReplaced = neighborhoodFromRequestCep.replace(`'`,`"`)
      this.selectedNeighborhood = ""+this.neighborhoods.find(x => x.name === neighborhoodFromRequestCepReplaced).id; 
    }
  }
  
}
