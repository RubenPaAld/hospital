import { Component, OnInit } from '@angular/core';
import {SidebarService, UsuarioService} from '../../services/service.index';
import {UsuarioModel} from '../../models/usuario.model';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(public sidebarService: SidebarService, public us: UsuarioService) { }

  ngOnInit() {
    this.usuario = this.us.usuario;
    this.sidebarService.cargarMenu();
  }

}
