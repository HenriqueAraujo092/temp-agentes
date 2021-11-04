// import { Familia } from "./../models/familia.model";
import { FamiliaService } from "./../services/familia.service";
import { Visita } from "./../models/visita.model";
import { ActivatedRoute } from "@angular/router";
import { AlertController, NavController, ActionSheetController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";
import { VisitaService } from "../services/visita.service";
import { Router } from "@angular/router";
import { AgenteService } from "../services/agente.service";

@Component({
  selector: "app-visita",
  templateUrl: "./visita.page.html",
  styleUrls: ["./visita.page.scss"]
})
export class VisitaPage implements OnInit {

  constructor(
    public famService: FamiliaService,
    public visita: VisitaService,
    public alertController: AlertController,
    public nav: NavController,
    public route: ActivatedRoute,
    private router: Router,
    public agtService: AgenteService,
    private actionSheetController: ActionSheetController
  ) {}

  agenteNome: String;
  familia: any;
  visits: any[];
  family;
  agentes: string[];
  vazio = true;

  async pesquisar() {

    const res = await this.visita.pesquisaNis(this.route.snapshot.params["nis"]);

    if(!res.data.error) {

      this.visits = res.data.visits;
      this.family = res.data;


      if(this.visits.length !=0 ){
        this.vazio=false;
      }else{
        this.vazio=true;
      }

      // const response = await this.famService.pesquisaNis(this.route.snapshot.params["nis"])
      // this.familia = response.data;

      // this.visitas.forEach(async visita => {
      //   let agente = await this.agtService.pegar(visita.agente_id)
      //   visita.agente_nome = agente.nome;
      // })

    }

    // this.visita.pesquisaNis(this.route.snapshot.params["nis"]).subscribe(
    //   (data: any) => {
    //     if (!data.error) {
    //       this.visitas = data;
    //       if(this.visitas.length !=0 ){
    //         this.vazio=false;
    //       }else{
    //         this.vazio=true;
    //       }
    //       this.famService
    //         .pesquisaNis(this.route.snapshot.params["nis"])
    //         .subscribe((dataa: any) => {
    //           this.familia = dataa;
              
    //         });
    //         this.visitas.forEach(visita => {
    //           this.agtService.pegar(visita.agente_id).subscribe((dat: any) => {
    //             visita.agente_nome = dat.nome;
    //           });
    //         });
    //     }
    //   },
    //   error => {
    //     this.router.navigate(["/pesq-visita"]);
    //   }
    // );
  }

  openImageLink(imageLink) {
    
    // var tarea = imageLink;
      if (imageLink.indexOf("http://") == 0 || imageLink.indexOf("https://") == 0) {
        window.open(imageLink);
      } else {
        window.open('http://'+imageLink);
      }

  }

  async delete(id) {
    const res = await this.visita.delete(id);

    if(res) {

      //remove da lista de visitas, usando o id como parametro para o filtro
      var visits = this.visits.filter(x => {
        return x.id != id;
      })

      this.visits = visits;

      alert("Procedimento Realizado com sucesso");
    }

  }

  async presentActionSheetDeleteVisit(id) {
    const actionSheet = await this.actionSheetController.create({
      header: '> Tem certeza que deseja deletar a visita?',
      buttons: [{
        text: 'Deletar',
        // role: 'destructive',
        // icon: 'trash',
        handler: () => {
          this.delete(id)
        }
      }, {
        text: 'Cancelar',
        // icon: 'close',
        // role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  redirecionar() {
    this.router.navigate([
      "/form-visita/nis/" + this.route.snapshot.params["nis"]
    ]);
  }

  async ionViewWillEnter() {
    await this.pesquisar();
  }

  ngOnInit() {
    this.pesquisar();
   
  }
}
