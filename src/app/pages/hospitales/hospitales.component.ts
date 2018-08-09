import { Component, OnInit } from '@angular/core';
import {HospitalesService} from '../../services/hospitales/hospitales.service';
import {Hospital} from '../../models/hospital.model';
import {ImagenPipe} from '../../pipes/imagen.pipe';
import swal from 'sweetalert2';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean;
  totalRegistros: number;

  qHospital:string;

  constructor(private hs:HospitalesService, private mus:ModalUploadService, private actRout:ActivatedRoute) {
    this.actRout.queryParams.subscribe( params => {
      this.qHospital = params['hospital'];
    })
  }

  ngOnInit() {

    if (this.qHospital)
      this.buscarHospitales(this.qHospital);
    else
      this.cargarHospitales();

    this.mus.notificaicon.subscribe( resp => {
      this.cargarHospitales();
    });
  }

  buscarHospitales(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
    } else {
      this.cargando = true;
      this.hs.buscarHospitales(termino).subscribe( (hospitales: Hospital[]) => {
        this.totalRegistros = hospitales.length;
        this.hospitales = hospitales;
        console.log(hospitales);
        this.cargando = false;
      });
    }
  }

  public cargarHospitales() {

    this.cargando = true;
    this.hs.loadHospitales().subscribe((resp:any) => {
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }

  borrarHospital(hospital: Hospital) {

    swal({
      title: '¿Esta seguro?',
      text: "Esta apunto de borrar a '" + hospital.nombre +"'",
      imageUrl: new ImagenPipe().transform(hospital.img),
      imageWidth: 200,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar'
    }).then((borrar) => {
      if (borrar.value) {
        this.hs.borrarHospital(hospital._id).subscribe(resp => {
          this.cargarHospitales();
        });
      }
    })
  }

  actualizarHospital(hospital: Hospital) {
    this.hs.updateHospital(hospital).subscribe();
  }

  mostrarModal(id: string) {
    this.mus.mostrarModal('hospitales',id);
  }

  nuevoHospital() {

    swal({
      title: 'Nombre del hospital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Crear',
    }).then((result) => {
      if (result.value) {
        let hospital = new Hospital(result.value);
        this.hs.createHospital(hospital).subscribe(resp => {
          this.cargarHospitales();
        });
      }
    })

  }

}
