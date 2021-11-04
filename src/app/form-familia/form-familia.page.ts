import { AlertController, NavController } from "@ionic/angular";
import { Family } from "./../models/familia.model";
import { Address } from "./../models/address.model";
import { FamiliaService } from "./../services/familia.service";
import { AddressService } from "./../services/address.service";
import { RevenueService } from "./../services/revenue.service";
import { Component, ComponentFactoryResolver, OnInit } from "@angular/core";
import axios from 'axios';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: "app-form-familia",
  templateUrl: "./form-familia.page.html",
  styleUrls: ["./form-familia.page.scss"]
})
export class FormFamiliaPage implements OnInit {

  family : any = {
    nis: "",
    family_responsible: "",
    phone: "",
    sewer_access: false,
    water_access: false,
    electricity_access: false,
    transport: false,
    revenue_id: ""
  }

  cepRequest;

  states;
  cities;
  neighborhoods;

  
  selectedState;
  selectedCity;
  selectedNeighborhood;
  cep = "";
  logradouro;
  number;
  complement;

  revenues;

  ocultar: boolean = false;

  familyNisAlreadyExists;
  familyObjAlreadyyExists; //objeto da familia que veio para ser atualizada

  constructor(
    private famService: FamiliaService,
    public alertController: AlertController,
    public nav: NavController,
    private addressService: AddressService,
    private revenueService: RevenueService,
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.getStates();
    this.getRevenues();

    this.verifyIfIsEdit();
  }

  //verifica se existe o parametro 'familyNis" na navegação, com isso a tela torna-se a tela de editar
  async verifyIfIsEdit() {
    this.familyNisAlreadyExists = this.activatedRoute.snapshot.paramMap.get("familyNis");

    if(this.familyNisAlreadyExists) {
      
      let resp = await this.famService.pesquisaNis(this.familyNisAlreadyExists);
      const family = resp.data;
      this.familyObjAlreadyyExists = family;

      await this.getCitiesFromState( {detail: {value:""+family.address.state_id}} )
      await this.getNeighborhoodsFromCity( {detail: {value:""+family.address.city_id}} )
      
      this.complement = family.address.complement;
      this.cep = family.address.cep;
      this.logradouro = family.address.logradouro;
      this.number = family.address.number;
      this.selectedState = ""+family.address.state_id;
      this.selectedCity = ""+family.address.city_id;
      this.selectedNeighborhood = ""+family.address.neighborhood_id;


      this.family.nis = family.nis;
      this.family.family_responsible = family.family_responsible;
      this.family.phone = family.phone;
      this.family.sewer_access = family.sewer_access;
      this.family.water_access = family.water_access;
      this.family.electricity_access = family.electricity_access;
      this.family.transport = family.transport;
      this.family.revenue_id = ""+family.revenue_id;

    } 

  }

  async updateFamily() {

    if( 
      !this.family.nis ||
      !this.family.family_responsible ||
      !this.family.phone ||
      !this.family.revenue_id ||
      !this.selectedState ||
      !this.selectedCity ||
      !this.selectedNeighborhood ||
      !this.cep ||
      !this.logradouro ||
      !this.number ||
      !this.complement
    ) {
      this.alertError();
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

    this.family = { ...this.family, id: this.familyObjAlreadyyExists.id }
    const family = await this.famService.updateFamily(this.family, address)

    if(family.data.error) {
      alert(family.data.error)
      return false;
    }

    if(family) {
      this.alertSuccess(family.data.nis);
    }
  }


  async createFamily() {
    const address : Address = {
      complement: this.complement ? this.complement : "",
      cep: this.cep,
      city_id: this.selectedCity,
      logradouro: this.logradouro,
      neighborhood_id: this.selectedNeighborhood,
      number: this.number,
      state_id: this.selectedState
    }

    const family = await this.famService.createFamily(this.family, address)

    if(family.data.error) {
      alert(family.data.error)
      return false;
    }

    this.clearFields()

    if(family) {
      this.alertSuccess(family.data.nis);
    }

  }

  async clearFields() {
    this.family.nis = null,
    this.family.nis = null,
    this.family.family_responsible = null,
    this.family.phone = null,
    this.selectedState = null,
    this.selectedCity = null,
    this.selectedNeighborhood = null,
    this.cep = null,
    this.logradouro = null,
    this.number = null,
    this.complement = null
  }

  async getRevenues() {
    const revenues = await this.revenueService.getRevenues();
    this.revenues = revenues.data
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
    // this.selectedCity = cepRequest.data.localidade;
    
    // console.log(this.cities)
    // this.selectedNeighborhood = cepRequest.data.bairro;


    // console.log(cepRequest);
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

  //função de checar formulario

  async checar() {

    if(!this.family.nis) {
      const alert = await this.alertController.create({
        header: "Erro ao cadastrar familia",
        subHeader: "Verifique o campo NIS",
        mode: "md",
  
        buttons: ["Ok"]
      });
  
      await alert.present();
      return false;
    }

    if(!this.family.family_responsible) {
      const alert = await this.alertController.create({
        header: "Erro ao cadastrar familia",
        subHeader: "Verifique o campo responsável da familia",
        mode: "md",
  
        buttons: ["Ok"]
      });
  
      await alert.present();
      return false;
    }

    if(!this.family.phone) {
      const alert = await this.alertController.create({
        header: "Erro ao cadastrar familia",
        subHeader: "Verifique o campo telefone",
        mode: "md",
  
        buttons: ["Ok"]
      });
  
      await alert.present();
      return false;
    }

    if(!this.family.revenue_id) {
      const alert = await this.alertController.create({
        header: "Erro ao cadastrar familia",
        subHeader: "Verifique o campo renda per capta",
        mode: "md",
  
        buttons: ["Ok"]
      });
  
      await alert.present();
      return false;
    }

    if(!this.selectedState) {
      const alert = await this.alertController.create({
        header: "Erro ao cadastrar familia",
        subHeader: "Verifique o campo estado",
        mode: "md",
  
        buttons: ["Ok"]
      });
  
      await alert.present();
      return false;
    }

    if(!this.selectedCity) {
      const alert = await this.alertController.create({
        header: "Erro ao cadastrar familia",
        subHeader: "Verifique o campo cidade",
        mode: "md",
  
        buttons: ["Ok"]
      });
  
      await alert.present();
      return false;
    }

    if(!this.selectedNeighborhood) {
      const alert = await this.alertController.create({
        header: "Erro ao cadastrar familia",
        subHeader: "Verifique o campo bairro",
        mode: "md",
  
        buttons: ["Ok"]
      });
  
      await alert.present();
      return false;
    }

    if(!this.cep) {
      const alert = await this.alertController.create({
        header: "Erro ao cadastrar familia",
        subHeader: "Verifique o campo cep",
        mode: "md",
  
        buttons: ["Ok"]
      });
  
      await alert.present();
      return false;
    }

    if(!this.logradouro) {
      const alert = await this.alertController.create({
        header: "Erro ao cadastrar familia",
        subHeader: "Verifique o campo logradouro",
        mode: "md",
  
        buttons: ["Ok"]
      });
  
      await alert.present();
      return false;
    }

    if(!this.number) {
      const alert = await this.alertController.create({
        header: "Erro ao cadastrar familia",
        subHeader: "Verifique o campo numero",
        mode: "md",
  
        buttons: ["Ok"]
      });
  
      await alert.present();
      return false;
    }

    this.createFamily();
    
  }

  //Alerts de sucesso e erro
  async alertSuccess(familyNis) {
    const alert = await this.alertController.create({
      header: "Procedimento realizado com Sucesso",
      mode: "md",
      buttons: [{
        
        text: 'Ok',
        cssClass: 'secondary',
        handler: async () => {
          // this.nav.navigateBack("/pesq-familia");
          await this.router.navigate(['familia/nis/',familyNis]);
        }
      }]
    });

    await alert.present();
  }
  async alertError() {
    const alert = await this.alertController.create({
      header: "Erro ao cadastrar familia",
      subHeader: "Verifique os campos e tente novamente",
      mode: "md",

      buttons: ["Ok"]
    });

    await alert.present();
  }

  //avançar pagina - frontend
  avancar() {
    if (this.ocultar == false) {
      this.ocultar = true;
    } else {
      this.ocultar = false;
    }
  }

  //array de municipios
  municipios = [
    "Abaiara",
    "Acarapé",
    "Acaraú",
    "Acopiara",
    "Aiuaba",
    "Alcântaras",
    "Altaneira",
    "Alto Santo",
    "Amontada",
    "Antonina do Norte",
    "Apuiarés",
    "Aquiraz",
    "Aracati",
    "Aracoiaba",
    "Ararendá",
    "Araripe",
    "Aratuba",
    "Arneiroz",
    "Assaré",
    "Aurora",
    "Baixio",
    "Banabuiú",
    "Barbalha",
    "Barreira",
    "Barro",
    "Barroquinha",
    "Baturité",
    "Beberibe",
    "Bela Cruz",
    "Boa Viagem",
    "Brejo Santo",
    "Camocim",
    "Campos Sales",
    "Canindé",
    "Capistrano",
    "Caridade",
    "Cariré",
    "Caririaçu",
    "Cariús",
    "Carnaubal",
    "Cascavel",
    "Catarina",
    "Catunda",
    "Caucaia",
    "Cedro",
    "Chaval",
    "Choró",
    "Chorozinho",
    "Coreaú",
    "Crateús",
    "Crato",
    "Croatá",
    "Cruz",
    "Deputado Irapuan Pinheiro",
    "Ererê",
    "Eusébio",
    "Farias Brito",
    "Forquilha",
    "Fortaleza",
    "Fortim",
    "Frecheirinha",
    "General Sampaio",
    "Graça",
    "Granja",
    "Granjeiro",
    "Groaíras",
    "Guaiúba",
    "Guaraciaba do Norte",
    "Guaramiranga",
    "Hidrolândia",
    "Horizonte",
    "Ibaretama",
    "Ibiapina",
    "Ibicuitinga",
    "Icapuí",
    "Icó",
    "Iguatu",
    "Independência",
    "Ipaporanga",
    "Ipaumirim",
    "Ipu",
    "Ipueiras",
    "Iracema",
    "Irauçuba",
    "Itaiçaba",
    "Itaitinga",
    "Itapagé",
    "Itapipoca",
    "Itapiúna",
    "Itarema",
    "Itatira",
    "Jaguaretama",
    "Jaguaribara",
    "Jaguaribe",
    "Jaguaruana",
    "Jardim",
    "Jati",
    "Jijoca de Jericoaroara",
    "Juazeiro do Norte",
    "Jucás",
    "Lavras da Mangabeira",
    "Limoeiro do Norte",
    "Madalena",
    "Maracanaú",
    "Maranguape",
    "Marco",
    "Martinópole",
    "Massapê",
    "Mauriti",
    "Meruoca",
    "Milagres",
    "Milhã",
    "Miraíma",
    "Missão Velha",
    "Mombaça",
    "Monsenhor Tabosa",
    "Morada Nova",
    "Moraújo",
    "Morrinhos",
    "Mucambo",
    "Mulungu",
    "Nova Olinda",
    "Nova Russas",
    "Novo Oriente",
    "Ocara",
    "Orós",
    "Pacajus",
    "Pacatuba",
    "Pacoti",
    "Pacujá",
    "Palhano",
    "Palmácia",
    "Paracuru",
    "Paraipaba",
    "Parambu",
    "Paramoti",
    "Pedra Branca",
    "Penaforte",
    "Pentecoste",
    "Pereiro",
    "Pindoretama",
    "Piquet Carneiro",
    "Pires Ferreira",
    "Poranga",
    "Porteiras",
    "Potengi",
    "Potiretama",
    "Quiterianópolis",
    "Quixadá",
    "Quixelô",
    "Quixeramobim",
    "Quixeré",
    "Redenção",
    "Reriutaba",
    "Russas",
    "Saboeiro",
    "Salitre",
    "Santa Quitéria",
    "Santana do Acaraú",
    "Santana do Cariri",
    "São Benedito",
    "São Gonçalo do Amarante",
    "São João do Jaguaribe",
    "São Luís do Curu",
    "Senador Pompeu",
    "Senador Sá",
    "Sobral",
    "Solonópole",
    "Tabuleiro do Norte",
    "Tamboril",
    "Tarrafas",
    "Tauá",
    "Tejuçuoca",
    "Tianguá",
    "Trairi",
    "Tururu",
    "Ubajara",
    "Umari",
    "Umirim",
    "Uruburetama",
    "Uruoca",
    "Varjota",
    "Várzea Alegre",
    "Viçosa do Ceará"
  ];
}
