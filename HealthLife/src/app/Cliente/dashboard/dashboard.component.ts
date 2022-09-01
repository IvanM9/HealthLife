import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as iconosfab from '@fortawesome/free-brands-svg-icons';
import {CargarScriptsJSService} from '../../cargar-scripts-js.service';
import { refresh } from 'aos';
import * as moment from 'moment'
import Swal from 'sweetalert2'
 
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
  fecha:any;

  //Llamando a la función para poder cargar el JS que hace la animación del menú en la página de incio
  constructor(private _cargarScripts:CargarScriptsJSService, private ruta:Router) {
  }


  ngOnInit(): void {
    moment.locale('ES')
    this.fecha=moment().format("dddd").toUpperCase();
   
    /*if(sessionStorage.getItem("token_id") == undefined){
      this.ruta.navigateByUrl('/inicio');
    }*/
    this._cargarScripts.CargarJS(["cliente/animacionmenu"]);
    this.nomUsuario = sessionStorage.getItem("nombreUsuario")||"usuario2";
    this.rolUsuario = sessionStorage.getItem("rol") || "Usuario";

    this.menuOpciones.push({icono:this.faHome, nombre:"Inicio"})
    if(sessionStorage.getItem("rol") == "cliente"){
      this.menuOpciones.push({icono:this.faPlanAlimenticio, nombre:"Planes alimenticios", habilitado:true})
      this.menuOpciones.push({icono:this.faPlanEjercicio, nombre:"Planes ejercicios", habilitado:true})
      this.menuOpciones.push({icono:this.faProfesionales, nombre:"Profesionales", habilitado:true})
      this.menuOpciones.push({icono:this.faMisPlanes, nombre:"Mis planes", habilitado:true})
      this.menuOpciones.push({icono:this.faEstadisticas, nombre:"Estadísticas", habilitado:true})
      this.menuOpciones.push({icono:this.faChat, nombre:"Chat", habilitado:false})
      this.menuOpciones.push({icono:this.faExperiencias, nombre:"Experiencias", habilitado:false})
    }
    else{
      this.menuOpciones.push({icono:this.faMisPlanes, nombre:"Planes", habilitado:true})
      this.menuOpciones.push({icono:this.faUserPerfil, nombre:"Mi perfil", habilitado:true})
      this.menuOpciones.push({icono:this.faProfesionales, nombre:"Clientes suscritos", habilitado:true})
    }
  }

  //Inidice para mostrar componentes dentro del dashboard
  cambiarIndice(indice: number){
    console.log(indice)
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

  mensajeMantenimiento(){
    Swal.fire({
      title: '¡Lo sentimos!',
      text: 'Esta opción aún no está disponible, seguiremos trabajando en futuras actualizaciones. Gracias por su comprensión.',
      imageUrl: 'https://ventaserviciospc.files.wordpress.com/2015/07/1.png?w=352&h=248',
      imageWidth: 200,
      imageHeight: 150,
      imageAlt: 'Custom image',
    })
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
  faMisPlanes = iconos.faHeart;



}
