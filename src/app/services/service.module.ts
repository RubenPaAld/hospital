import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginGuard, SettingsService, SharedService, SidebarService, SubirArchivoService, UsuarioService} from './service.index';
import {HttpClientModule} from '@angular/common/http';
import {ModalUploadService} from '../components/modal-upload/modal-upload.service';


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
    LoginGuard,
    ModalUploadService
  ]
})
export class ServiceModule { }
