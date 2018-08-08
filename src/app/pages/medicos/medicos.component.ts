import { Component, OnInit } from '@angular/core';
import {Hospital} from '../../models/hospital.model';
import {MedicoService} from '../../services/service.index';
import {Medico} from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  cargando:boolean = true;
  totalRegistros:number = 0;
  medicos: Medico[] = [];
  constructor(public ms: MedicoService) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  buscarMedicos(termino: string) {

    if (termino.length <= 0) {
      this.cargarMedicos();
    } else {
      this.cargando = true;
      this.ms.buscarMedicos(termino).subscribe( (medicos: Medico[]) => {
        this.medicos = medicos;
        this.cargando = false;
      });
    }
  }

  crearMedico() {

  }

  cargarMedicos() {
    this.cargando = true;
    this.ms.cargarMedicos().subscribe( resp => {
      this.medicos = resp;
      this.totalRegistros = this.medicos.length;
      this.cargando = false;
    })
  }

  borrarMedico(medico: Medico) {

    this.ms.borrarMedico(medico._id).subscribe( resp =>{
      let index = this.medicos.indexOf(medico);
      this.medicos.splice(index,1);
    });
  }

  editarMedico(medico: Medico) {

  }

}
