import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Hospital} from '../../models/hospital.model';
import {HospitalesService, MedicoService} from '../../services/service.index';
import {Medico} from '../../models/medico.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ModalUploadService} from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('','',null, new Hospital(''));

  constructor(
    public ms:MedicoService,
    public hs:HospitalesService,
    public router: Router,
    public activatedRouter: ActivatedRoute,
    public mus: ModalUploadService
  ) {
    this.activatedRouter.params.subscribe( params => {

      let id = params['id'];

      if (id != 'nuevo') {
        this.cargarMedico(id);
      }
    });

  }

  ngOnInit() {
    this.hs.loadHospitales().subscribe( (resp:any) =>{
      this.hospitales = resp.hospitales;
    });
    this.mus.notificaicon.subscribe( resp => {
        console.log(resp);
        this.medico.img = resp.medico.img;
    });
  }

  guardar(f: NgForm) {

    if (f.invalid)
      return;

    this.ms.crearMedico(this.medico).subscribe( medico => {
      this.medico._id = medico._id;
      this.router.navigate(['/medico',medico._id]);
    });
  }

  cargarMedico(id:string) {
    this.ms.cargarMedico(id).subscribe( medico => {
      this.medico = medico;
      this.cambioHospital(this.medico.hospital._id);
    });
  }

  cambioHospital(id:string) {

    if (id !== 'undefined')
      this.hs.loadHospital(id).subscribe( resp => {
        this.medico.hospital = resp;
      });
    else
      this.medico.hospital = new Hospital('');
  }

  cambiarFotografia () {
    this.mus.mostrarModal('medicos',this.medico._id);
  }
}
