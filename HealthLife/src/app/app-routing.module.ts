import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './Cliente/dashboard/dashboard.component';
import { DetallePlanComponent } from './Cliente/detalle-plan/detalle-plan.component';
import { ProfesionalesComponent } from './Cliente/profesionales/profesionales.component';


const routes: Routes = [
  {path:"", pathMatch:"full", redirectTo:"inicio"},
  {path: "login", component:LoginComponent},
  {path:"inicio", component:InicioComponent},
  {path:"dashboard", component:DashboardComponent},
  {path: "detalle-plan", component:DetallePlanComponent},
  {path: "profesionales", component:ProfesionalesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
