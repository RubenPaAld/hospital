import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {APP_ROUTES} from './app.routes';
import { RegisterComponent } from './login/register.component';
import {PagesModule} from './pages/pages.module';
import {ServiceModule} from './services/service.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    PagesModule,
    APP_ROUTES,
    NgbModule.forRoot(),
    ServiceModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
