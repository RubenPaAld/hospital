import { Component, OnInit } from '@angular/core';
import {SidebarService, UsuarioService} from '../../services/service.index';

@Component({
  selector: 'app-siderbar',
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css']
})
export class SiderbarComponent implements OnInit {

  constructor(public sidebarService: SidebarService, public us: UsuarioService) { }

  ngOnInit() {
  }

}
