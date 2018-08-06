import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {UsuarioService} from '../services/service.index';
import {UsuarioModel} from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame = false;
  auth2: any;

  constructor(public router: Router, private us: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    this.recuerdame = this.email.length > 1;
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '45954488776-6v5i1f5f3gv5r8cjaokmmj5ms9ai2uiq.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      //let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this.us.loginGoogle(token).subscribe(resp => {
        //this.router.navigate(['/dashboard']);
        window.location.hash = '#/dashboard';
      });
    });
  }

  public ingresar(forma: NgForm) {

    if (forma.invalid)
      return;

    let usuario = new UsuarioModel(null, forma.value.email, forma.value.password);

    this.us.login(usuario, forma.value.recuerdame).subscribe( res => {
      this.router.navigate(['/dashboard']);
    });
  }

}
