import { Visita } from './../models/visita.model';
import { VisitaService } from './../services/visita.service';
import { Component, OnInit } from '@angular/core';
import { FamiliaService } from '../services/familia.service';
import { AlertController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-pesq-visita',
  templateUrl: './pesq-visita.page.html',
  styleUrls: ['./pesq-visita.page.scss'],
})
export class PesqVisitaPage implements OnInit {

  nis:number;
  visitas :  Visita[];

  constructor(
    private famService: FamiliaService,
    public visita: VisitaService,
    public alertController: AlertController,
    public nav: NavController,
    private router : Router,
    private apiService: ApiService) { }


    async pesquisar() {

      const response = await this.visita.pesquisaNis(this.nis);

      if(response.data.error) {
        alert(response.data.error)
        return false;
      }

      this.router.navigate(["/visita/nis/"+this.nis])


    //  this.visita.pesquisaNis(this.nis).subscribe((data:any)=>{
    //   if(!data.familia){
    //      this.router.navigate(["/visita/nis/"+this.nis])
    //   }else{
    //     this.alertError();
    //   }
    //  },(error)=>{
    //    this.alertError();
    //  })
    
    }

    async alertError() {
      const alert = await this.alertController.create({
        header: "Não foi possivel encontrar resultado",
        subHeader: "Verifique os campos e tente novamente.",
        
        mode: "md",
  
        buttons: ["Ok"]
      });
  
      await alert.present();
    }
   
  ngOnInit() {
  }

}
