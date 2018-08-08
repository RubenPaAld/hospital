import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {SubirArchivoService} from '../../services/service.index';
import {ModalUploadService} from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css']
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemporal: string;

  constructor(public  sa: SubirArchivoService, public mus: ModalUploadService) {}

  public seleccionImagen( archivo:File ) {

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

  cerrarModal() {
    this.imagenTemporal = null;
    this.imagenSubir = null;

    this.mus.ocultarModal();
  }

  subirImagen() {
    this.sa.subirArchivo(this.imagenSubir,this.mus.tipo, this.mus.id ).then( resp => {
      this.mus.notificaicon.emit(resp);
      this.cerrarModal();

    }).catch( err => {
      console.log('error en la carga');
    })
  }

  ngOnInit() {
  }

}
