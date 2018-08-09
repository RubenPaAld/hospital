import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UsuarioModel} from '../../models/usuario.model';
import {URL_SERVICES} from '../../config/config';
import {catchError, map} from 'rxjs/operators';
import { _throw } from 'rxjs/observable/throw';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {SubirArchivoService} from '../subirArchivo/subir-archivo.service';
import {throwError} from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: UsuarioModel;
  token: string;
  menu: any = [];

  constructor(private http: HttpClient, private router: Router, private  sb: SubirArchivoService) {
    this.loadStorage();
  }

  isLoged() {
    return (this.token.length > 5);
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loadStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }
  }

  userStorage(id:string, token: string, usuario: UsuarioModel, menu:any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  public loginGoogle(token: string) {

    let url = URL_SERVICES + '/login/google';

    return this.http.post(url, {token}).pipe(
      map( (resp: any) => {
        this.userStorage(resp.id, resp.token, resp.usuario, resp.menu);
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
        this.userStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      }),catchError(err => {
        swal('Error',err.error.mensaje,'error');
        return throwError(err);
      })
    );
  }

  public createUser(user: UsuarioModel) {

    let url = URL_SERVICES + '/user';

    return this.http.post( url , user).pipe(
      map(res => {
        swal('Usuario creado',user.email,'success');
      }),catchError((res: HttpErrorResponse ) => {
        swal('err.error.mensaje',res.error.errors.message,'error');
        return _throw(res.status);
      })
    );
  }

  public updateUser(user: UsuarioModel) {

    let url = URL_SERVICES + '/user/' + user._id;

    url += '?token='+this.token;

    return this.http.put(url, user).pipe(
      map((resp:any) => {

        if (user._id === this.usuario._id) {
          let userDb: UsuarioModel = resp.usuario;
          this.userStorage(userDb._id, this.token, userDb, this.menu);
        }

        swal('Usuario Mpdificado',user.nombre,'success');
        return true;
      })
    );
  }

  public cambiarImagen (file: File, id: string) {

    this.sb.subirArchivo(file,'usuarios',id).then( (resp:any) => {
      this.usuario.img = resp.usuario.img;
      swal('Imagen Actualizada', this.usuario.nombre, 'success');
      this.userStorage(id,this.token,this.usuario, this.menu);
    }).catch( resp => {
      console.log( resp);
    });
  }

  public loadUsers(offset: number = 0) {

    let url = URL_SERVICES + '/user?offset=' + offset;

    return this.http.get(url);
  }

  public buscarUsuarios(termino: string) {

    let url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url).pipe(
      map( (resp: any) => resp.usuarios )
    );
  }

  public borrarUsuario(id: string) {
    let url = URL_SERVICES + '/user/'+id + '?token='+ this.token;

    return this.http.delete(url).pipe( map (resp => {
      swal('usuario borrado', 'El usuario ha sido eliminado correctamente', 'success')
      return true;
    }));
  }
}
