import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() {



    this.contarTres().then(
      mensaje => console.log('con exito ', mensaje),
    ).catch(
      error => console.log('error ', error)
    )

  }

  ngOnInit() {
  }

  contarTres(): Promise<string> {
    console.log('inicio');
    return new Promise(
      (resolve,reject) => {

        let contador = 0;

        let interval = setInterval(
          () => {
            console.log(contador);
            contador += 1;

            if (contador == 3) {
              resolve('muy bien');
              clearInterval(interval);
            }
          },1000)
      });
  }

}
