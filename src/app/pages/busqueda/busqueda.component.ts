import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {URL_SERVICES} from '../../config/config';
import {UsuarioModel} from '../../models/usuario.model';
import {Hospital} from '../../models/hospital.model';
import {Medico} from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  usuarios:UsuarioModel[] = [];
  medicos:Hospital[] = [];
  hospitales:Medico[] = [];

  constructor(private actRou: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.actRou.params.subscribe( params => {
      this.buscar(params['termino']);
    })
  }

  ngOnInit() {
  }

  buscar(termino: string) {

    let url = URL_SERVICES + '/busqueda/todo/' + termino;

    this.http.get(url).subscribe( (resp:any) => {
      this.hospitales = resp.hospitales;
      this.medicos = resp.medicos;
      this.usuarios = resp.usuarios;
      })
  }

}
