import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  name;
  email;
  password;
  cpf;
  // confirmPassword;

  constructor(public router :Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }

  async register() {

    if( !this.name || !this.email ||!this.password ) {
      alert("Preencha todos os campos");
      return false;
    }


    try {

      // let response = await this.apiService.api.get("/check", {})

      

      let response = await this.apiService.api.post('/usuario',{
        name: this.name,
        password: this.password,
        email: this.email,
        cpf: this.cpf
      }, {
        headers: {
          'Accept':"application/json",
          'Content-Type':"application/json"
        }
      })

      // let response = await api.post('/usuario',{
      //   nome: this.name,
      //   senha: this.password,
      //   email: this.email,
      // }, {
      //   headers: {
      //     'Accept':"application/json",
      //     'Content-Type':"application/json"
      //   }
      // })

      console.log(response);

      if(response.data.error) {
        alert(response.data.error)
        return false;
      }

      alert("Conta criada com sucesso, entre em contato com o administrador do aplicativo para ativa-la");
      this.router.navigate(["/login"]);

    } catch (err) {
      alert("Sistema fora do ar");
      console.log(err)
      // alert(err);

    }
    

    // if(request.status == 200) {
    //   alert("Conta criada com sucesso, entre em contato com o administrador do aplicativo para ativa-la");
    //   this.router.navigate(["/login"]);
    // }

    // console.log(request)
  }

}
