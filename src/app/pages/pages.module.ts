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

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule.forRoot(),
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
  ],
  declarations: [
      DashboardComponent,
      ProgressComponent,
      Graficas1Component,
      PagesComponent,
      LoadBarComponent,
      GraficaComponent,
      AccountSettingsComponent
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    PagesComponent
  ]
})
export class PagesModule { }
