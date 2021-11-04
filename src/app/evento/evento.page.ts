import { EventoService } from './../services/evento.service';
import { Evento } from './../models/evento.model';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-evento',
  templateUrl: './evento.page.html',
  styleUrls: ['./evento.page.scss'],
})

export class EventoPage implements OnInit {

  eventos: Evento[];
  vazio=true;

  constructor(public eveSer : EventoService,
              public router: Router) { 

  }

  async ionViewWillEnter() {
    this.listandoEventos();
  }

  async listandoEventos(){

    const eventos: any = await this.eveSer.listarEventos();

    if(eventos) {
      this.eventos = eventos
    }

    // so repeti o codigo que estava abaixo, nao sei oque isso faz
    if(eventos && this.eventos.length != 0){
      this.vazio=false;
    }else{
      this.vazio=true;
    }
  }


  openImageLink(imageLink) {
    
    // var tarea = imageLink;
      if (imageLink.indexOf("http://") == 0 || imageLink.indexOf("https://") == 0) {
        window.open(imageLink);
      } else {
        window.open('http://'+imageLink);
      }

  }

  ngOnInit() {
    
  }

  goToEditEvent(eventId) {
    this.router.navigate(['/form-evento', { eventId } ]);
  }

}
