import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  HospitalesService,
  LoginGuard,
  AdminGuard,
  MedicoService,
  SettingsService,
  SharedService,
  SidebarService,
  SubirArchivoService,
  UsuarioService
} from './service.index';
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
    AdminGuard,
    ModalUploadService,
    HospitalesService,
    MedicoService
  ]
})
export class ServiceModule { }
