import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {path:"", pathMatch:"full", redirectTo:"inicio"},
  {path: "login", component:LoginComponent},
  {path:"inicio", component:InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
