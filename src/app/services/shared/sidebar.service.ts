import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {titulo: 'DashBoard', url: '/dashboard'},
        {titulo: 'Progress', url: '/progress'},
        {titulo: 'Graficas', url: '/graficas1'},
        {titulo: 'Opciones', url: '/account-settings'},
      ]
    }
  ];

  constructor() { }
}
