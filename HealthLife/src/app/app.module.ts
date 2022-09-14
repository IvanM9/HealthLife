import { InterceptorService } from './loader/interceptor.service';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//importando servivicio para poder ejecutar los JS
import {CargarScriptsJSService} from './cargar-scripts-js.service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Auth/login/login.component';
import { DashboardAdminComponent } from './Administrador/dashboard-admin/dashboard-admin.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './Cliente/dashboard/dashboard.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ContenidoInicioComponent } from './Cliente/contenido-inicio/contenido-inicio.component';
import { DetallePlanComponent } from './Cliente/detalle-plan/detalle-plan.component';
import { PerfilUsuarioComponent } from './Cliente/perfil-usuario/perfil-usuario.component';
import { PlanesComponent } from './Cliente/planes/planes.component';
import { ProfesionalesComponent } from './Cliente/profesionales/profesionales.component';

import { InicioProfesionalesComponent } from './Profesional/inicio-profesionales/inicio-profesionales.component';
import { ClientesAdminProfesionalesComponent } from './Profesional/clientes-admin-profesionales/clientes-admin-profesionales.component';
import { PlanesAdminProfesionalesComponent } from './Profesional/planes-admin-profesionales/planes-admin-profesionales.component';
import { PerfilProfesionalComponent } from './Profesional/perfil-profesional/perfil-profesional.component';
import { ActividadesComponent } from './Cliente/actividades/actividades.component';
import { MisPlanesComponent } from './Cliente/mis-planes/mis-planes.component';
import { EstadisticasComponent } from './Cliente/estadisticas/estadisticas.component';
import { ChatComponent } from './Cliente/chat/chat.component';
import { InicioDashboardComponent } from './Cliente/inicio-dashboard/inicio-dashboard.component';
import { ActividadesAdminProfesionalesComponent } from './Profesional/actividades-admin-profesionales/actividades-admin-profesionales.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardAdminComponent,
    InicioComponent,
    DashboardComponent,
    ContenidoInicioComponent,
    DetallePlanComponent,
    PerfilUsuarioComponent,
    PlanesComponent,
    ProfesionalesComponent,
    InicioProfesionalesComponent,
    ClientesAdminProfesionalesComponent,
    PlanesAdminProfesionalesComponent,
    PerfilProfesionalComponent,
    ActividadesComponent,
    MisPlanesComponent,
    EstadisticasComponent,
    ChatComponent,
    InicioDashboardComponent,
    ActividadesAdminProfesionalesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi:true},
    CargarScriptsJSService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
