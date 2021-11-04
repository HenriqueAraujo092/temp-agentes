import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-resetar-senha',
  templateUrl: './resetar-senha.page.html',
  styleUrls: ['./resetar-senha.page.scss'],
})
export class ResetarSenhaPage implements OnInit {

  email;

  constructor(public router :Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  goToLogin () {
    this.router.navigate(["/login"]);
  }

  async passwordRecover() {

    if(!this.email) {
      alert("Preencha todos os campos")
      return false;
    }

    try {
      const response = await this.apiService.api.post('/auth/forgotpassword', {
        email: this.email
      })
      // const response = await api.post('/auth/forgotpassword', {
      //   email: this.email
      // })

      if(response.data.error) {
        alert(response.data.error)
        return false;
      }

      alert(`Email enviado para ${this.email}`)

    } catch (err) {
      alert("Sistema fora do ar");
      // alert(err)
    }
    

    
  }

}
