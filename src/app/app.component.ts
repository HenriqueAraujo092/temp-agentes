import { FamiliaService } from './services/familia.service';
// import { Familia } from './models/familia.model';
import { Component } from '@angular/core';

import { Platform, NavController, AlertController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { AgenteService } from './services/agente.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Storage } from "@ionic/storage";
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  // estrategia, "inicializar/salvar" o token nessa variavel e depois usar o mesmo em apiService
  static apiToken;

  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  nomeUser:string;
  funcaoUser:string = "Agente";
  // familia: Familia;
  familia;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public alertController : AlertController ,
    public nav:NavController,
    public menu :MenuController,
    public famServ : FamiliaService,
    public agtService : AgenteService,
    private googlePlus: GooglePlus,
    private storage: Storage,
    private router: Router
  ) {
    this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(async () => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      AppComponent.apiToken = await this.storage.get('token'); 

    });
    this.agtService.pegarStorage("nome_agente").then(val => {
      this.nomeUser = val;
    });
  }

  async alertFamilia() {
    const alert = await this.alertController.create({
      header: 'Insira o NIS',
      mode:"md",
      inputs: [
        {
          name: 'nis',
          type: 'text',
          placeholder: 'Numero no NIS aqui ...'
        }
      ],
      buttons: [
        {
          text: 'Novo Cadastro',
          handler: () => { 
           this.nav.navigateForward("/form-familia");
          }
        }, {
          text: 'Acessar',
          cssClass: 'botao',
          handler: async data => {
            this.famServ.pesquisaNis(data.nis).then((resp)=>{this.familia = resp.data});
            // this.famServ.pesquisaNis(data.nis).subscribe((data: Familia)=>{this.familia = data});
            this.nav.navigateForward("/familia/"+(this.familia));
          }
        }
      ]
    });

    await alert.present();
  }
  fechar(){
    this.menu.close('first');
  }
  async logout(){
    // console.log("Logout")
    this.fechar();
    await this.agtService.remover();

    
    // if(this.platform.is('cordova')) {
    //   await this.googlePlus.logout();
    // }
    
    this.router.navigate(['/login'])
    
    // this.nav.navigateRoot("/login");
  }
  async alertVisita() {
    const alert = await this.alertController.create({
      header: 'Insira o NIS',
      mode:"md",
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Numero do NIS aqui ...'
        }
      ],
      buttons: [
        {
          text: 'Nova Visita',
          handler: () => { 
           this.nav.navigateForward("/form-visita");
          }
        }, {
          text: 'Acessar',
          cssClass: 'botao',
          handler: () => {
            this.nav.navigateForward("/visita");
          }
        }
      ]
    });

    await alert.present();
  }
}
