import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/service.index';
import {UsuarioModel} from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(public  us: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.us.usuario;
  }

}
