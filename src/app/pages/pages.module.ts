import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graficas1Component} from './graficas1/graficas1.component';
import {PagesComponent} from './pages.component';
import {SharedModule} from '../shared/shared.module';
import {PAGES_ROUTES} from './pages.routes';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import {LoadBarComponent} from '../components/load-bar/load-bar.component';
import {ChartsModule} from 'ng2-charts';
import {GraficaComponent} from '../components/grafica/grafica.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import {PipesModule} from '../pipes/pipes.module';
import { ProfileComponent } from './profile/profile.component';
import {FileUploadModule} from 'ng2-file-upload';
import { UsuariosComponent } from './usuarios/usuarios.component';
import {ModalUploadComponent} from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule.forRoot(),
    PAGES_ROUTES,
    FormsModule,
    ChartsModule,
    PipesModule,
    FileUploadModule,
  ],
  declarations: [
      DashboardComponent,
      ProgressComponent,
      Graficas1Component,
      PagesComponent,
      LoadBarComponent,
      GraficaComponent,
      AccountSettingsComponent,
      PromesasComponent,
      RxjsComponent,
      ProfileComponent,
      UsuariosComponent,
      ModalUploadComponent,
      HospitalesComponent,
      MedicosComponent,
      MedicoComponent,
      BusquedaComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent
  ]
})
export class PagesModule { }
