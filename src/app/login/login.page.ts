import { Router } from '@angular/router';
import { AlertController, NavController, MenuController } from "@ionic/angular";
import { AgenteService } from "./../services/agente.service";
import { Component, OnInit, Input } from "@angular/core";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ApiService } from '../services/api.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})

export class LoginPage implements OnInit {

  email;
  password;

  constructor(
    private agtService: AgenteService,
    public alertControl: AlertController,
    public nav: NavController,
    public router :Router,
    public menuC : MenuController,
    private googlePlus: GooglePlus,
    private apiService: ApiService
  ) {}

  cpf: string;

  ngOnInit() {
    this.menuC.swipeEnable(false);
    this.agtService.pegarStorage("id_agente").then((val)=>{
      if(val){
        this.router.navigate(["/home"]);
      }
    })
  }

  clearInputs() {
    this.email = "";
    this.password= "";
  }

  goToRegister() {
    this.router.navigate(["/registro"]);
    this.clearInputs();
  }

  goToPasswordRecover() {
    this.router.navigate(["/resetar-senha"]);
    this.clearInputs();
  }

  async createSession() {

    if( !this.email || !this.password ) {
      alert("Preencha todos os campos");
      return false;
    }
    
    try {
      // const response = await api.post('/sessao',{
      //   email: this.email,
      //   password: this.password
      // })

      const response = await this.apiService.api.post('/sessao',{
        email: this.email,
        password: this.password
      })
      // console.log(response)
      
      if(response.data.error) {
        alert(response.data.error)
        return false;
      }

      const token = response.data.token;
      


      const agentId = response.data.user.agent.id;
      // const agentId = 999999999; //id fake, somente temporario para testes

      const displayName = response.data.user.name;

      

      await this.agtService.criarStorage(agentId, displayName, `Bearer ${token}`, response.data.user);

      

      this.clearInputs();

      this.router.navigate(["/home"]);

    } catch (err) {
      alert("Sistema fora do ar");
      // alert(err)
      console.log(err);
    }
    

    // console.log(response.data);

    // if(response.status == 200) {
    //   const userId = response.data.user.id;
    //   const displayName = response.data.user.nome;
    //   this.agtService.criarStorage(userId, displayName);
    //   this.router.navigate(["/home"]);
    // }
    
  }

  // googleLogin() {
  //   this.googlePlus.login({})
  //     .then(res => {
  //       // console.log(res)
  //       this.agtService.criarStorage(res.userId, res.displayName);
  //       this.router.navigate(["/home"]);
  //     },
  //     (reject) => {
  //       console.log(`reject ${reject}`)
  //     })
  //     .catch(err => console.error(err));
  // }
  

  // logar() {
  //   this.agtService.login(this.cpf).subscribe((agt:any)=>{
  //     if(agt.error){
  //       this.alertErro();
  //     }else{
  //       this.agtService.criarStorage(agt.id, agt.nome);
  //       this.router.navigate(["/home"]);
  //     }     
  //   }
  //   )
  // }

  async alertErro() {
    const alert = await this.alertControl.create({
      header: "Agente não encontrado",
      subHeader: "Verifique o campo de CPF",
      mode: "md",
      buttons: ["Ok"]
    });

    await alert.present();
  }
}
