import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { DashboardComponent } from './Cliente/dashboard/dashboard.component';
import { DetallePlanComponent } from './Cliente/detalle-plan/detalle-plan.component';
import { ProfesionalesComponent } from './Cliente/profesionales/profesionales.component';

import { ClientesAdminProfesionalesComponent } from './Profesional/clientes-admin-profesionales/clientes-admin-profesionales.component';
import { PlanesAdminProfesionalesComponent } from './Profesional/planes-admin-profesionales/planes-admin-profesionales.component';
import { PerfilProfesionalComponent } from './Profesional/perfil-profesional/perfil-profesional.component';
import { ActividadesComponent } from './Cliente/actividades/actividades.component';


const routes: Routes = [
  {path:"", pathMatch:"full", redirectTo:"inicio"},
  {path: "login", component:LoginComponent},
  {path:"inicio", component:InicioComponent},
  {path:"dashboard", component:DashboardComponent},
  {path: "detalle-plan", component:DetallePlanComponent},
  {path: "profesionales", component:ProfesionalesComponent},

  {path: "clientes_admin", component:ClientesAdminProfesionalesComponent},
  {path: "planes_admin", component:PlanesAdminProfesionalesComponent},
  {path: "perfil_profesional", component:PerfilProfesionalComponent},
  {path: "actividades", component:ActividadesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
