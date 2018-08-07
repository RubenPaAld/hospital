import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public oculto: boolean = true;

  public notificaicon = new EventEmitter<any>();

  constructor() {}

  ocultarModal() {
    this.oculto = true;
    this.id = null;
    this.tipo = null;
  }

  mostrarModal( tipo:string, id:string ) {
    this.oculto = false;
    this.id = id;
    this.tipo = tipo;
  }
}
