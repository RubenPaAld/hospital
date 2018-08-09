import { Injectable } from '@angular/core';
import {UsuarioService} from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any[];
  /*public menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'DashBoard', url: '/dashboard'},
        {titulo: 'Progress', url: '/progress'},
        {titulo: 'Graficas', url: '/graficas1'},
        {titulo: 'Promesas', url: '/promesas'},
        {titulo: 'Rxjs', url: '/rxjs'},
        {titulo: 'Opciones', url: '/account-settings'},
      ]
    },
    {
      titulo: 'Mantenimiento',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: '/usuarios'},
        {titulo: 'Hospitales', url: '/hospitales'},
        {titulo: 'Medicos', url: '/medicos'},
      ]
    }
  ];*/

  constructor(private us: UsuarioService) {}

  cargarMenu() {
    this.menu = this.us.menu;
  }

}
