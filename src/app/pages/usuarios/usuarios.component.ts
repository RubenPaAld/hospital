import { Component, OnInit } from '@angular/core';
import {UsuarioModel} from '../../models/usuario.model';
import {UsuarioService} from '../../services/service.index';
import swal from 'sweetalert2';
import {ImagenPipe} from '../../pipes/imagen.pipe';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';
import {HttpParams} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuarios: UsuarioModel[] = [];

  offset: number = 0;
  totalRegistros: number = 0;
  cargando: boolean;
  qUsuario:string;



  constructor(private  us: UsuarioService, public mus: ModalUploadService, private actRout:ActivatedRoute) {
    this.actRout.queryParams.subscribe( params => {
      this.qUsuario = params['usuario'];
    })
  }


  ngOnInit() {

    if (this.qUsuario)
      this.buscarUsuarios(this.qUsuario);
    else
      this.cargarUsuarios();

    this.mus.notificaicon.subscribe( resp => {
      this.cargarUsuarios();
    });
  }

  public cargarUsuarios() {

    this.cargando = true;
    this.us.loadUsers(this.offset).subscribe((resp:any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  public cambiarDesde(val:number) {

    let offset = this.offset + val;

    if (offset < 0 || offset > this.totalRegistros)
      return;

    this.offset = offset;

    this.cargarUsuarios();

  }

  buscarUsuarios( termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
    } else {
      this.cargando = true;
      this.us.buscarUsuarios(termino).subscribe( (usuarios: UsuarioModel[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });
    }
  }

  borrarUsuario(usuario: UsuarioModel) {

    if ( usuario._id === this.us.usuario._id ) {
      swal('No se pudo borrar usuario', 'No puedes borrarte a ti mismo','error');
      return;
    }

    swal({
      title: '¿Esta seguro?',
      text: "Esta apunto de borrar a '" + usuario.nombre +"'",
      imageUrl: new ImagenPipe().transform(usuario.img),
      imageWidth: 200,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar'
    }).then((borrar) => {
      if (borrar.value) {

        this.us.borrarUsuario(usuario._id).subscribe( resp => {

          console.log(this.usuarios.length -1 <= 0);

          if (this.usuarios.length -1 <= 0){
            this.cambiarDesde(-5);
          }else {
            this.cargarUsuarios();
          }
        })
      }
    })
  }

  actualizarUsuario(usuario: UsuarioModel) {

    this.us.updateUser(usuario).subscribe();
  }

  mostrarModal(id: string) {
    this.mus.mostrarModal('usuarios',id);
  }

}
