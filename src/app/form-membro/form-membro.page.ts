import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MembroService } from "./../services/membro.service";
import { GenderService } from "./../services/gender.service";
import { RoutineService } from "./../services/routine.service";
import { ReadTypeService } from "./../services/readtype.service";
import { ReadJobService } from "./../services/readJob.service";
import { KinshipService } from "./../services/kinship.service";
import { ScholarityService } from "./../services/scholarity.service";
import { DeficiencyService } from "./../services/deficiency.service";
import { CollectionService } from "./../services/collection.service";
import { Membro } from "./../models/membro.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import dateFormat from 'dateformat';

@Component({
  selector: "app-form-membro",
  templateUrl: "./form-membro.page.html",
  styleUrls: ["./form-membro.page.scss"]
})
export class FormMembroPage implements OnInit {
  //variaveis
  ocultar: boolean = false;
  escolaridade;
  membro: Membro = {
    nome: null,
    nascimento: null,
    genero: null,
    parentesco: null,
    frequencia_escola: null,
    escolaridade: null,
    gosto_ler: null,
    livro_agente: null,
    rotina_leitura: null,
    leitura_tipo: null,
    acervo: null,
    importancia_leitura: null,
    leitura_emprego: null
  };

  genders;
  kinships;
  routines;
  readTypes;
  collections;
  readJobs;
  scholarities;
  deficiencies;

  member : any = {
    name: "",
    birthdate: "",
    like_read: false,
    agent_indication_book: false,
    read_important: false,
    gender_id: "",
    kinship_id: "",
    scholarity_id: "",
    deficiency_id: "",
    routine_id: "",
    read_type_id: "",
    collection_id: "",
    read_job_id: "",
    family_id: this.activatedRoute.snapshot.params["id"]
  }

  memberIdAlreadyExists;

  //metodos
  constructor(
    private memService: MembroService,
    private activatedRoute: ActivatedRoute,
    public alertController : AlertController,
    public nav:NavController,
    private genderService: GenderService,
    private kinshipService: KinshipService,
    private routineService: RoutineService,
    private readTypeService: ReadTypeService,
    private collectionService: CollectionService,
    private readJobService: ReadJobService,
    private scholarityService: ScholarityService,
    private deficiencyService : DeficiencyService,
    private router: Router,
  ) {}

  async ngOnInit() {
    await this.getGenders();
    await this.getKinships();
    await this.getRoutines();
    await this.getReadTypes();
    await this.getCollections();
    await this.getReadJobs();
    await this.getScholarities();
    await this.getDeficiencies();

    this.verifyIfIsEdit();
  }

  async verifyIfIsEdit() {
    this.memberIdAlreadyExists = this.activatedRoute.snapshot.paramMap.get("memberId");

    if(this.memberIdAlreadyExists) {
      let resp = await this.memService.getMember(this.memberIdAlreadyExists);
      const member = resp.data;

      this.member.name = member.name;

      this.member.name = member.name;
      this.member.birthdate = dateFormat(new Date(member.birthdate), "yyyy-mm-dd");
      this.member.like_read = member.like_read;
      this.member.agent_indication_book = member.agent_indication_book;
      this.member.read_important = member.read_important;
      this.member.gender_id = ""+member.gender_id;
      this.member.kinship_id = ""+member.kinship_id;
      this.member.scholarity_id = ""+member.scholarity_id;
      this.member.deficiency_id = ""+member.deficiency_id;
      this.member.routine_id = ""+member.routine_id;
      this.member.read_type_id = ""+member.read_type_id;
      this.member.collection_id = ""+member.collection_id;
      this.member.read_job_id = ""+member.read_job_id;
      this.member.family_id = member.family_id;

    }

  }

  async updateMember() {

    this.member = {...this.member, id: this.memberIdAlreadyExists};
    const member = await this.memService.updateMember(this.member);

    if(member.data.error) {
      alert(member.data.error)
      return false;
    }

    if(member) {
      this.alertSuccess(member.data.family.nis);
    }
  }

  criarMembro(){
    if(
      !this.member.name ||
      !this.member.birthdate ||
      !this.member.gender_id ||
      !this.member.kinship_id ||
      !this.member.scholarity_id ||
      !this.member.routine_id ||
      !this.member.read_type_id ||
      !this.member.collection_id ||
      !this.member.read_job_id ||
      !this.member.family_id
    ){
      this.alertError();
    }else{
      this.criando();
    }

    // if(
    //   this.membro.acervo == null ||
    //   this.membro.escolaridade == null ||
    //   this.membro.frequencia_escola == null ||
    //   this.membro.genero == null ||
    //   this.membro.gosto_ler == null ||
    //   this.membro.importancia_leitura == null ||
    //   this.membro.leitura_emprego == null ||
    //   this.membro.leitura_tipo == null ||
    //   this.membro.livro_agente == null ||
    //   this.membro.nascimento == null ||
    //   this.membro.nome == null ||
    //   this.membro.parentesco == null ||
    //   this.membro.rotina_leitura == null 
    // ){
    //   this.alertError();
    // }else{
    //   console.log(this.membro)
    //   return false;
    //   this.criando();
    // }
    
  }

  async getRoutines() {
    const routines = await this.routineService.getRoutines();
    this.routines = routines.data
  }

  async getGenders() {
    const genders = await this.genderService.getGenders();
    this.genders = genders.data
  }

  async getKinships() {
    const kinships = await this.kinshipService.getKinships();
    this.kinships = kinships.data
  }

  async getReadTypes() {
    const readTypes = await this.readTypeService.getReadTypes();
    this.readTypes = readTypes.data
  }

  async getCollections() {
    const collections = await this.collectionService.getCollections();
    this.collections = collections.data
  }

  async getReadJobs() {
    const readJobs = await this.readJobService.getReadJobs();
    this.readJobs = readJobs.data
  }

  async getScholarities() {
    const scholarities = await this.scholarityService.getScholarities();
    this.scholarities = scholarities.data
  }

  async getDeficiencies() {
    const deficiencies = await this.deficiencyService.getDeficiencies();
    this.deficiencies = deficiencies.data
  }
  
  criando(){
    this.memService.criarMembro(this.member,this.activatedRoute.snapshot.params["id"]).then(
      (resp)=>{
        this.alertSuccess(resp.data.family.nis);
    },error =>{
        this.alertError();
    })

    // this.memService.criarMembro(this.membro,this.route.snapshot.params["id"]).subscribe(
    //   (data:Membro)=>{
    //     this.alertSuccess();
    // },error =>{
    //     this.alertError();
    // })

  }
  avancar() {
    if (this.ocultar == false) {
      this.ocultar = true;
    } else {
      this.ocultar = false;
    }
  }

  async alertSuccess(familyNis) {
    const alert = await this.alertController.create({
      header: "Membro cadastrado com sucesso",

      mode: "md",

      buttons: [{
        text: 'Ok',
        handler: async () => { 
          await this.router.navigate(['familia/nis/',familyNis]);
          // this.nav.navigateBack("/pesq-familia");
        }
      }]
    });

    await alert.present();
  }

  async alertError() {
    const alert = await this.alertController.create({
      header: "Erro ao cadastrar membro",
      subHeader: "Verifique os campos e tente novamente",
      mode: "md",

      buttons: ["Ok"]
    });

    await alert.present();
  }

}
