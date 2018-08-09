import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private us:UsuarioService) {}

  canActivate() {

    if (this.us.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      this.us.logout();
      return false;
    }

  }
}
