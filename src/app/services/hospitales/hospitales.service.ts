import { Injectable } from '@angular/core';
import {URL_SERVICES} from '../../config/config';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {UsuarioService} from '../usuario/usuario.service';
import swal from 'sweetalert2';
import {Hospital} from '../../models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalesService {

  constructor(private http: HttpClient, private us: UsuarioService) { }

  public loadHospitales() {

    let url = URL_SERVICES + '/hospital';

    return this.http.get(url);
  }

  public loadHospital(id: string) {

    let url = URL_SERVICES + '/hospital/'+id;

    return this.http.get(url).pipe( map((resp:any) => {
      return resp.hospital;
    }));
  }

  public borrarHospital(id: string) {
    let url = URL_SERVICES + '/hospital/'+id + '?token='+ this.us.token;

    return this.http.delete(url).pipe( map (resp => {
      swal('usuario borrado', 'El hospital ha sido eliminado correctamente', 'success')
      return true;
    }));
  }

  public createHospital(hospital: Hospital) {

    let url = URL_SERVICES + '/hospital' + '?token=' + this.us.token;

    return this.http.post( url , hospital).pipe(
      map(res => {
        swal('Hospital creado',hospital.nombre,'success');
      })
    );
  }

  public buscarHospitales(termino: string) {

    let url = URL_SERVICES + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get(url).pipe(
      map( (resp: any) => resp.hospitales )
    );
  }

  public updateHospital(hospital: Hospital) {

    let url = URL_SERVICES + '/hospital/' + hospital._id;

    url += '?token='+this.us.token;

    return this.http.put(url, hospital).pipe(
      map((resp:any) => {
        swal('Hospital Modificado',hospital.nombre,'success');
        return true;
      })
    );
  }
}
