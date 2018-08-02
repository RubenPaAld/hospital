import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {SiderbarComponent} from './siderbar/siderbar.component';
import {NoPageFoundComponent} from './no-page-found/no-page-found.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    SiderbarComponent,
    BreadcrumbsComponent,
    NoPageFoundComponent
  ],
  exports: [
    HeaderComponent,
    SiderbarComponent,
    BreadcrumbsComponent,
    NoPageFoundComponent
  ]
})
export class SharedModule { }
