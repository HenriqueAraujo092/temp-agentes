import { AlertController, NavController, ActionSheetController } from '@ionic/angular';
import { error } from "util";
import { FamiliaService } from "./../services/familia.service";
import { ActivatedRoute, Router } from "@angular/router";
import { VisitaService } from "./../services/visita.service";
import { ActivityService } from "./../services/activity.service";
import { BookService } from "./../services/book.service";
import { Visita } from "./../models/visita.model";
import { Component, OnInit } from "@angular/core";
import { AgenteService } from "../services/agente.service";

@Component({
  selector: "app-form-visita",
  templateUrl: "./form-visita.page.html",
  styleUrls: ["./form-visita.page.scss"]
})
export class FormVisitaPage implements OnInit {

  public form = [
    { val: 'Pepperoni', isChecked: true },
    { val: 'Sausage', isChecked: false },
    { val: 'Mushroom', isChecked: false }
  ];

  ocultar: boolean = false;
  campo1: boolean = false;
  campo2: boolean = false;
  campo3: boolean = false;
  campo4: boolean = false;
  campo5: boolean = false;
  outros: String = "";
  cadastrou = false;

  visita: Visita = {
    num_atendidos: 0,
    num_cadastrados: 0,
    nis: this.actRoute.snapshot.params["nis"].toString(),
    data: new Date(),
    hora: "",
    titulo: "",
    editora: "",
    autor: "",
    atividade: "",
    comentario: "",
    familia_id: 0,
    agente_id: 0,
    agente_nome: "",
    link_imagens: ""
  };

  family;

  members;

  participants = [];

  activities;
  selectedActivities = [];

  books;
  selectedBooks = [];

  visit = {
    attended_number: 0,
    date: "",
    time: "",
    image_link: "",
    comments: "",
    family_id: "",
    agent_id: ""
  }

  constructor(
    public visitaService: VisitaService,
    public agtService: AgenteService,
    public actRoute: ActivatedRoute,
    public route: Router,
    public familiaService: FamiliaService,
    public alertController : AlertController,
    public nav : NavController,
    private activityService: ActivityService,
    private bookService: BookService,
    private actionSheetController: ActionSheetController
  ) {}

  junk() {
    // valor de quantos checkbox estao true
    // var result = this.form.reduce(function(previousValue, currentObject){
    //     return previousValue + (currentObject.isChecked ? 1: 0); 
    // }, 0);
    // console.log(result)
    const request = {
      activities : this.selectedActivities.map(activity => activity.id), //faz um array somente com os IDS das atividades
      books: this.selectedBooks.map(book => book.id), //faz um array somente com os IDS dis livros
      visit: this.visit,
      participants: this.participants
    }

    const response = this.visitaService.createVisita(request, this.actRoute.snapshot.params["nis"].toString())

  }

  // async checkboxHandler(value) {
  //   value.detail.checked ? this.visit.attended_number++ : this.visit.attended_number--
  // }

  async getActivities() {
    const activities = await this.activityService.getActivities();
    this.activities = activities.data
  }

  async getBooks() {
    const books = await this.bookService.getBooks();
    this.books = books.data
  }

  async ngOnInit() {

    this.getActivities();
    this.getBooks();

    this.visit.agent_id = await this.agtService.pegarStorage("id_agente");

    this.familiaService
      .pesquisaNis(this.actRoute.snapshot.params["nis"])
      .then((resp) => {
        // console.log(resp)
        this.family = resp.data;
        this.members = resp.data.members;
        this.visit.family_id = resp.data.id;
      });
      // this.agtService.pegarStorage("id_agente").then(val => {
      //   console.log(val)
      //   this.visita.agente_id = val;
      // });

    // this.familiaService
    //   .pesquisaNis(this.actRoute.snapshot.params["nis"])
    //   .subscribe((data: any) => {
    //     this.visita.familia_id = data.id;
    //   });
    //   this.agtService.pegarStorage("id_agente").then(val => {
    //     this.visita.agente_id = val;
    //   });

  }

  avancar() {
    if (this.ocultar == false) {
      this.ocultar = true;
    } else {
      this.ocultar = false;
    }
  }

  cadastrar() {

    const request = {
      activities : this.selectedActivities.map(activity => activity.id), //faz um array somente com os IDS das atividades
      books: this.selectedBooks.map(book => book.id), //faz um array somente com os IDS dis livros
      visit: this.visit,
      participants: this.participants
    }

    if(
      request.activities.length == 0 ||
      request.books.length == 0 ||
      request.participants.length == 0 ||
      !request.visit.attended_number ||
      !request.visit.date ||
      !request.visit.time ||
      // !request.visit.image_link ||
      !request.visit.comments ||
      !request.visit.family_id ||
      !request.visit.agent_id
    ) {
      this.alertErro();
      return false;
    }

    this.visitaService
      .createVisita(request, this.actRoute.snapshot.params["nis"])
      .then(
        (data: any) => {
          this.alertSucesso();
        },
        error => {
          this.alertErro();
        }
      );


    // this.visitaService
    //   .createVisita(this.visita, this.actRoute.snapshot.params["nis"])
    //   .subscribe(
    //     (data: any) => {
    //       this.alertSucesso();
    //     },
    //     error => {
    //       this.alertErro();
    //     }
    //   );
  }

  verificar() {
    this.visita.atividade =
      this.campo1 +
      "/" +
      this.campo2 +
      "/" +
      this.campo3 +
      "/" +
      this.campo4 +
      "/" +
      this.campo5 +
      "/" +
      this.outros;
    
    if (
      this.visita.num_atendidos == 0 ||
      this.visita.nis == "" ||
      this.visita.hora == "" ||
      this.visita.titulo == "" ||
      this.visita.editora == "" ||
      this.visita.autor == "" ||
      this.visita.atividade == "false/false/false/false/false/" ||
      this.visita.comentario == "" ||
      this.visita.agente_id == 0
    ) {
      this.alertErro();
    } else {
      this.cadastrar();
    }
  }

  removeParticipant(participant) {
    //remove da lista de participantes, usando o id como parametro para o filtro
    var participants = this.participants.filter(x => {
      return x.id != participant.id;
    })
    this.participants = participants;
    this.visit.attended_number = this.participants.length;
  }

  async alertErro() {
    const alert = await this.alertController.create({
      header: "Não foi possivel concluir o cadastro",
      subHeader: "Verifique os campos",
      mode: "md",
      buttons: ["Ok"]
    });

    await alert.present();
  }
  async alertSucesso() {
    const alert = await this.alertController.create({
      header: "Visita cadastrada com sucesso",
      mode: "md",
      buttons: [{
        
        text: 'Ok',
        cssClass: 'secondary',
        handler: () => {
          this.nav.navigateBack("/visita/nis/"+this.visita.nis);
        }
      }]
    });

    await alert.present();
  }

  async presentAlertCheckboxActivities() {
    let listActivities = []

    this.activities.forEach(activity => {
      listActivities.push({
        name: activity.label,
        type: 'checkbox',
        label: activity.label,
        value: activity
      })
    });

    const alert = await this.alertController.create({
      header: 'Selecione as atividades',
      inputs: listActivities,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (values) => {
            this.selectedActivities = []
            this.selectedActivities = values;
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertCheckboxBooks() {
    let listBooks = []

    this.books.forEach(book => {
      listBooks.push({
        name: book.name,
        type: 'checkbox',
        label: book.name,
        value: book
      })
    });

    const alert = await this.alertController.create({
      header: 'Selecione os livros',
      inputs: listBooks,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (values) => {
            this.selectedBooks = []
            this.selectedBooks = values;
            
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertCheckboxMembers() {
    let listMembers = []

    this.members.forEach(member => {
      listMembers.push({
        name: member.name,
        type: 'checkbox',
        label: member.name,
        value: member
      })
    });

    const alert = await this.alertController.create({
      header: 'Selecione os membros',
      inputs: listMembers,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Ok',
          handler: (values) => {
            values.forEach(element => {
              // adiciona no array APENAS se AINDA NAO EXISTIREM no mesmo
              this.participants.indexOf(element) === -1 ? this.participants.push(element) : '';
              // this.participants.push(element);
            });
            // this.participants = values;
            this.visit.attended_number = this.participants.length;
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertCheckboxAddParticipant() {

    const alert = await this.alertController.create({
      header: 'Nome do participante',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nome participante',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (value) => {
            let idAux = Math.round(Math.random() * (999999999 - 99999999) + 99999999) // gera um ID auxiliar no minimo de 99999999 e maximo de 999999999
            let auxObg = {id:idAux, name: value.name}
            this.participants.push(auxObg)
            this.visit.attended_number = this.participants.length;
            // this.selectedBooks = []
            // this.selectedBooks = values;
            
            // console.log(values);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentActionSheetParticipant() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Adicionar participante',
      buttons: [{
        text: '> Adicionar participante que é membro da familia',
        // role: 'destructive',
        handler: () => {
          this.presentAlertCheckboxMembers();
        }
      }, {
        text: '> Adicionar participante que nao é um membro da familia',
        handler: () => {
          this.presentAlertCheckboxAddParticipant();
        }
      }, {
        text: 'Cancel',
        // role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentActionSheetBooks() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selecione a opção',
      buttons: [{
        text: '> Pesquisar livro',
        handler: () => {
          this.presentAlertPromptSearchBook();
        }
      }, {
        text: '> Cadastrar livro',
        handler: () => {
          this.presentAlertPromptCreateBook();
        }
      }, {
        text: '> Cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentAlertPromptSearchBook() {
    const alertCtr = await this.alertController.create({
      header: 'ISBN do livro!',
      inputs: [
        {
          name: 'isbn',
          type: 'text',
          placeholder: 'Digite o isbn',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (value) => {
            const request = await this.bookService.getBook(value.isbn);

            if(request.data.error) {
              alert(request.data.error)
              return false;
            }

            const book = request.data;

            //verifica se o livro ja esta adicionado no array 'selectedBooks' usando o isbn como parametro
            const checkIsbnInBookList = pamareter => pamareter.isbn === book.isbn;

            if( !this.selectedBooks.some(checkIsbnInBookList) ) {
              this.selectedBooks.push(book)
            }

            
          }
        }
      ]
    });

    await alertCtr.present();
  }

  async presentAlertPromptCreateBook() {
    const alertCtr = await this.alertController.create({
      header: 'ISBN do livro!',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nome do livro',
        },
        {
          name: 'author',
          type: 'text',
          placeholder: 'Nome do autor',
        },
        {
          name: 'publishing_company',
          type: 'text',
          placeholder: 'Editora',
        },
        {
          name: 'isbn',
          type: 'text',
          placeholder: 'Digite o isbn',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: async (value) => {

            const request = {
              name: value.name,
              author: value.author,
              publishing_company: value.publishing_company,
              isbn: value.isbn,
            }

            const book = await this.bookService.create(request);

            if(book.data.error) {
              alert(book.data.error)
              return false;
            }

            this.selectedBooks.push(book.data)

            
          }
        }
      ]
    });

    await alertCtr.present();
  }

  removeBook(book) {
    //remove da lista de livros, usando o id como parametro para o filtro
    var books = this.selectedBooks.filter(x => {
      return x.id != book.id;
    })
    this.selectedBooks = books;
  }


}
