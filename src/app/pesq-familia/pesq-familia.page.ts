import { AlertController, NavController } from "@ionic/angular";
import { Family } from "./../models/familia.model";
import { FamiliaService } from "./../services/familia.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-pesq-familia",
  templateUrl: "./pesq-familia.page.html",
  styleUrls: ["./pesq-familia.page.scss"]
})
export class PesqFamiliaPage implements OnInit {

  nis: number;
  // familia: Family;
  
  constructor(
    private famService: FamiliaService,
    public alertController: AlertController,
    public nav: NavController,
    private router : Router
  ) {}

  ngOnInit() {}
  
  pesquisar() {

    this.famService.pesquisaNis(this.nis).then(
      (resp) => {
        if (resp.data == null) {
          this.alertNull();
        } else{
          this.router.navigate(['familia/nis/',resp.data.nis]);
          this.router.navigate(['familia/nis/',resp.data.nis]);
          this.router.navigate(['familia/nis/',resp.data.nis]);
          
        }
      },
      error => {
        this.alertError();
      }
    );

    // this.famService.pesquisaNis(this.nis).subscribe(
    //   (data: Familia) => {
    //     if (data == null) {
    //       this.alertNull();
    //     } else{
    //       this.router.navigate(['familia/nis/',data.nis]);
    //       this.router.navigate(['familia/nis/',data.nis]);
    //       this.router.navigate(['familia/nis/',data.nis]);
          
    //     }
    //   },
    //   error => {
    //     this.alertError();
    //   }
    // );

  }

  async alertError() {
    const alert = await this.alertController.create({
      header: "Erro no sistema",
      subHeader: "Verifique os campos e tente novamente",
      mode: "md",

      buttons: ["Ok"]
    });

    await alert.present();
  }

  async alertNull() {
    const alert = await this.alertController.create({
      header: "Não foi possivel encontrar familia",
      subHeader: "Verifique o numero do nis",
      mode: "md",

      buttons: ["Ok"]
    });

    await alert.present();
  }
}
