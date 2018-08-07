import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginGuard, SettingsService, SharedService, SidebarService, SubirArchivoService, UsuarioService} from './service.index';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    SubirArchivoService,
    LoginGuard
  ]
})
export class ServiceModule { }
