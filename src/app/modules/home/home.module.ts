import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { NullToValuePipe } from 'src/app/pipes/null-to-value.pipe';
import { HomeComponent } from './home.component';
import { CrudTableComponent } from '../../components/crud-table/crud-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    CrudTableComponent,
    NullToValuePipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule
  ]
})
export class HomeModule { }
