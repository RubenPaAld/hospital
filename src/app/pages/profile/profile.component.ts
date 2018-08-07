import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/service.index';
import {UsuarioModel} from '../../models/usuario.model';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario: UsuarioModel;

  imagenSubir: File;

  imagenTemporal: string;

  constructor(private us: UsuarioService) {

    this.usuario = us.usuario;
  }

  ngOnInit() {

  }

  public seleccionImagen( archivo ) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }

    if (!archivo.type.startsWith('image')) {
      swal('Solo se admiten imagenes','El archivo selecionado es de extension '+archivo.type, 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();

    let urlImageTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      this.imagenTemporal = reader.result;
    };
  }

  public subirImagen() {

    this.us.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

  public guardar(usuario: UsuarioModel) {
    this.usuario.nombre = usuario.nombre;

    if (!this.usuario.google)
      this.usuario.email = usuario.email;

    this.us.updateUser(this.usuario).subscribe(resp => {
      console.log(resp);
      this.usuario = this.us.usuario;
    });
  }

}
