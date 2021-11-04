import { MembroService } from './../services/membro.service';
import { NavController } from "@ionic/angular";
import { FamiliaService } from "./../services/familia.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

@Component({
  selector: "app-familia",
  templateUrl: "./familia.page.html",
  styleUrls: ["./familia.page.scss"]
})
export class FamiliaPage implements OnInit {

  family;
  renda: string;
  familia_membros:any[];
  id_familia : number;

  constructor(
    private route: ActivatedRoute,
    public famService: FamiliaService,
    public nav: NavController,
    public memService:MembroService,
    public router: Router,
  ) {

    // this.famService.pesquisaNis(this.route.snapshot.params["nis"]).then( resp => {
    // this.id_familia = resp.data.id;
    // this.family = resp.data;
    // this.familia_membros = resp.data.members;
      

      // this.memService.getMembros(resp.data.id).then( response =>{
      //   this.familia_membros = response.data;
      //   switch (response.data.renda_per_capta) {
      //     case 1:
      //       this.renda = "Até meio salário mínimo";
      //       break;
      //     case 2:
      //       this.renda = "Até  salário mínimo";
      //       break;
      //     case 3:
      //       this.renda = "Mais de um salário mínimo";
      //       break;
      //   }
      // })
    // })

    // this.famService.pesquisaNis(this.route.snapshot.params["nis"]).subscribe((data:any)=>{
    //   this.id_familia = data.id;
    //   this.memService.getMembros(data.id).subscribe((res:any)=>{
    //     this.familia_membros = res;
    //     switch (res.renda_per_capta) {
    //       case 1:
    //         this.renda = "Até meio salário mínimo";
    //         break;
    //       case 2:
    //         this.renda = "Até  salário mínimo";
    //         break;
    //       case 3:
    //         this.renda = "Mais de um salário mínimo";
    //         break;
    //     }
    //   })
    // })
    
  }

  async ionViewWillEnter() {
    let resp = await this.famService.pesquisaNis(this.route.snapshot.params["nis"]);

    this.id_familia = resp.data.id;
    this.family = resp.data;
    this.familia_membros = resp.data.members;
  }

  async ngOnInit() {
    
  }

  goToEditFamily() {
    // this.router.navigate(['/form-familia', { :  } ]);
    this.router.navigate(['/form-familia', { familyNis: this.family.nis } ]);
  }

  goToEditMember(memberId) {
    this.router.navigate([`/familia/form-membro/${this.family.id}`, { memberId } ]);
  }

}
