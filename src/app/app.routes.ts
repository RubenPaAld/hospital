import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NoPageFoundComponent} from './shared/no-page-found/no-page-found.component';
import {RegisterComponent} from './login/register.component';

export const ROUTES: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', pathMatch: 'full', redirectTo: '/login'},
  {path: '**', component: NoPageFoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot(ROUTES, {useHash:true});
