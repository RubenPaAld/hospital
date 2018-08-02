import { Component, OnInit } from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {Meta, MetaDefinition, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;

  constructor(private  router: Router, private pagTitle: Title, private meta: Meta) {

    this.getDataRoute().subscribe(
      data => {
          this.titulo = data.titulo;
          this.pagTitle.setTitle(this.titulo);

          const meta: MetaDefinition = {
            name: 'descripcion',
            content: this.titulo
          };
          this.meta.updateTag(meta);
      }
    );
  }

  ngOnInit() {
  }

  getDataRoute() {

    return this.router.events.pipe(
      filter( data => {return data instanceof ActivationEnd}),
      filter( (data: ActivationEnd) => {return data.snapshot.firstChild === null}),
      map( (data:ActivationEnd) =>  data.snapshot.data )
    )
  }

}
