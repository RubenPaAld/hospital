import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import {map} from 'rxjs/operators';
import {UsuarioService} from '../usuario/usuario.service';
import {Medico} from '../../models/medico.model';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(public  http:HttpClient, public us:UsuarioService) { }

  cargarMedicos() {
    let url = URL_SERVICES + '/medico';

    return this.http.get(url).pipe(map((resp:any) => {
      return resp.medicos;
    }));
  }

  cargarMedico(id:string) {
    let url = URL_SERVICES + '/medico/'+id;

    return this.http.get(url).pipe(map((resp:any) => {
      return resp.medico;
    }));
  }



  buscarMedicos(termino:string) {
    let url = URL_SERVICES + '/busqueda/coleccion/medicos/'+termino;

    return this.http.get(url).pipe(map((resp:any) => {
      return resp.medicos;
    }));
  }

  borrarMedico(id:string) {

    let url = URL_SERVICES + '/medico/'+id+'?token='+this.us.token;

    return this.http.delete(url);
  }

  crearMedico(medico: Medico) {

    let url = URL_SERVICES + '/medico';

    if (medico._id) {

      url += '/'+medico._id
      url += '?token=' + this.us.token;

      return this.http.put(url, {nombre: medico.nombre,
                                      hospital: medico.hospital._id,
                                      usuario: medico.usuario._id
                                      }).pipe(map ((resp:any) => {
        swal('Medico modificado',resp.medico.nombre,'success');
        return resp.medico;
      }));

    } else {

      url += '?token=' + this.us.token;

      return this.http.post(url, medico).pipe(map ((resp:any) => {
        swal('Medico creado',resp.medico.nombre,'success');
        return resp.medico;
      }));
    }
  }
}
