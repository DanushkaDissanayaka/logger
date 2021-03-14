import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  // Common home module for public access
  {
    path: '',
    loadChildren: ()=> import('src/app/module/home/home.module').then(m=>m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(routes)