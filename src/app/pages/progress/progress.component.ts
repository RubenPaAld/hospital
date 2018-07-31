import { Component, OnInit } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {


  porcentaje1 = 10;
  porcentaje2 = 20;

  constructor(config: NgbProgressbarConfig) {
    // customize default values of progress bars used by this component tree
    config.striped = true;
    config.animated = true;
  }

  ngOnInit() {
  }

}
