import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-load-bar',
  templateUrl: './load-bar.component.html',
  styleUrls: ['./load-bar.component.css']
})
export class LoadBarComponent implements OnInit {

  @ViewChild('bar') bar: ElementRef;

  @Input() leyenda = 'leyenda';
  @Input() porcentaje = 10;

  @Output() cambioPorcentaje : EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  inputChange() {

    if (this.porcentaje < 0 || this.porcentaje === null) {
      this.porcentaje = 0;
    }else  if (this.porcentaje > 100) {
      this.porcentaje = 100;
    }

    this.bar.nativeElement.value = this.porcentaje;

    this.cambioPorcentaje.emit(this.porcentaje);
  }

  decrementar() {
    let state: number = this.porcentaje-5;

    if (state >= 0)
      this.porcentaje = state;
    else
      this.porcentaje = 0;

    this.bar.nativeElement.focus();
    this.cambioPorcentaje.emit(this.porcentaje);
  }

  incrementar() {
    let state: number = this.porcentaje+5;

    if (state <= 100)
      this.porcentaje = state;
    else
      this.porcentaje = 100;

    this.bar.nativeElement.focus();
    this.cambioPorcentaje.emit(this.porcentaje);
  }

}
