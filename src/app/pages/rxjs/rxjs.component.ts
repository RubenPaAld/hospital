import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscriber, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription;

  constructor() {

    this.suscription = this.regresaObservable().subscribe(
      m => console.log('sus ',m),
      error => console.log('error',error),
      () => console.log('acabamos')
    );
  }

  ngOnInit() {

  }

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      let interval = setInterval( () => {

        contador ++;

        const salida = {
          contador: contador,
          siguiente: contador+1
        }

        observer.next(salida);



      },1000);
    }).pipe(
      map(res => {return res.contador}),
      filter(
        (valor, index) => {

          return !(valor % 2 === 0)
      })
    );


  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

}
