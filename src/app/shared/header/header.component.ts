import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/service.index';
import {UsuarioModel} from '../../models/usuario.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(public  us: UsuarioService, public router:Router) {
  }

  ngOnInit() {
    this.usuario = this.us.usuario;
  }

  buscar(termino:string) {

    this.router.navigate(['/busqueda',termino]);
  }

}
