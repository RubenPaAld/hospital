import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuarioModel} from '../../models/usuario.model';
import {URL_SERVICES} from '../../config/config';
import {map} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {SubirArchivoService} from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: UsuarioModel;
  token: string;

  constructor(private http: HttpClient, private router: Router, private  sb: SubirArchivoService) {
    this.loadStorage();
  }

  isLoged() {
    return (this.token.length > 5);
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loadStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  userStorage(id:string, token: string, usuario: UsuarioModel) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  public loginGoogle(token: string) {

    let url = URL_SERVICES + '/login/google';

    return this.http.post(url, {token}).pipe(
      map( (resp: any) => {
        this.userStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  public login(usuario: UsuarioModel, recuerdame: boolean) {

    if (recuerdame)
      localStorage.setItem('email', usuario.email)
    else
      localStorage.removeItem('email');

    let  url = URL_SERVICES + '/login';

    return this.http.post(url, usuario).pipe(
      map((resp:any) => {
        this.userStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  public createUser(user: UsuarioModel) {

    let url = URL_SERVICES + '/user';

    return this.http.post( url , user).pipe(
      map(res => {
        swal('Usuario creado',user.email,'success');
      })
    );
  }

  public updateUser(user: UsuarioModel) {

    let url = URL_SERVICES + '/user/' + user._id;

    url += '?token='+this.token;

    return this.http.put(url, this.usuario).pipe(
      map((resp:any) => {
        let userDb: UsuarioModel = resp.usuario;
        this.userStorage(userDb._id, this.token, userDb);
        swal('Usuario Mpdificado',user.nombre,'success');
        return true;
      })
    );
  }

  public cambiarImagen (file: File, id: string) {

    this.sb.subirArchivo(file,'usuarios',id).then( (resp:any) => {
      this.usuario.img = resp.usuario.img;
      swal('Imagen Actualizada', this.usuario.nombre, 'success');
      this.userStorage(id,this.token,this.usuario);
    }).catch( resp => {
      console.log( resp);
    });
  }
}
