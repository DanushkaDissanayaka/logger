import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { GraphComponent } from './components/graph/graph.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },
];

@NgModule({
  declarations: [HomeComponent, GraphComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }