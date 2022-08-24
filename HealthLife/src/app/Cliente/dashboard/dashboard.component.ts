import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as iconosfab from '@fortawesome/free-brands-svg-icons';
import {CargarScriptsJSService} from '../../cargar-scripts-js.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit { 
  
  //Atributos
  indice = 0;
  nomUsuario = "usuario";
  rolUsuario = "rol";
  idPlan=0

  menuOpciones: any[] = []

  //Llamando a la función para poder cargar el JS que hace la animación del menú en la página de incio
  constructor(private _cargarScripts:CargarScriptsJSService, private ruta:Router) {
    
  }



  ngOnInit(): void {
    /*if(sessionStorage.getItem("token_id") == undefined){
      this.ruta.navigateByUrl('/inicio');
    }*/
    this._cargarScripts.CargarJS(["cliente/animacionmenu"]);
    this.nomUsuario = sessionStorage.getItem("nombreUsuario")||"usuario2";
    this.rolUsuario = sessionStorage.getItem("rol") || "Usuario";

    this.menuOpciones.push({icono:this.faHome, nombre:"Inicio"})
    // if(sessionStorage.getItem("rol") == "cliente"){
      this.menuOpciones.push({icono:this.faPlanAlimenticio, nombre:"Planes alimenticios", habilitado:true})
      this.menuOpciones.push({icono:this.faPlanEjercicio, nombre:"Planes ejercicios", habilitado:true})
      this.menuOpciones.push({icono:this.faProfesionales, nombre:"Profesionales", habilitado:true})
      this.menuOpciones.push({icono:this.faEstadisticas, nombre:"Estadísticas", habilitado:true})
      this.menuOpciones.push({icono:this.faChat, nombre:"Chat", habilitado:false})
      this.menuOpciones.push({icono:this.faExperiencias, nombre:"Experiencias", habilitado:false})
    // }
  }

  //Inidice para mostrar componentes dentro del dashboard
  cambiarIndice(indice: any){
    this.indice = indice;
  }

  mostrarDetallePlan(id:number){
    this.idPlan = id;
  }

  

  //Para cerrar la sesion
  cerrarSesion(){
    sessionStorage.clear();
    this.ruta.navigateByUrl('/login');
  }

  //Iconos para el menú de la parte superior
  faBars = iconos.faBars;
  faFlechaAbajo = iconos.faCaretDown;
  faUserPerfil = iconos.faUser;
  faConfiguracion = iconos.faGear;
  faCerrarSesion = iconos.faSignOut;
  faNotificacion = iconos.faBell;

  //Iconos para el menu de la parte izquierda
  faHome = iconos.faHome;
  faPlanAlimenticio = iconos.faAppleWhole;
  faPlanEjercicio = iconos.faDumbbell;
  faProfesionales = iconos.faUserTie;
  faEstadisticas = iconos.faChartSimple;
  faExperiencias = iconos.faUsersLine;
  faChat = iconos.faComments;



}
