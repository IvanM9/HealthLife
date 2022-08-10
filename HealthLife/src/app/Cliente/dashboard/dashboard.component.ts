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

  //Llamando a la función para poder cargar el JS que hace la animación del menú en la página de incio
  constructor(private _cargarScripts:CargarScriptsJSService) {
    _cargarScripts.CargarJS(["cliente/animacionmenu"]);
  }


  ngOnInit(): void {
  }

  //Iconos para el menú de la parte superior
  faBars = iconos.faBars;
  faFlechaAbajo = iconos.faAngleDown;
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


  fachart = iconos.faChartBar;
  facrown = iconos.faCrown;
  fasignoutalt = iconos.faSignOutAlt;
  fasearch = iconos.faSearch;

  //modulos
  fainfocircle = iconos.faInfoCircle;
  facheckcircle = iconos.faCheckCircle;
  faredoalt = iconos.faRedoAlt;
  facubes = iconos.faCubes;
  fahive = iconosfab.faHive;
  fath = iconos.faTh;
  fafont = iconos.faFont;
  fafilealt = iconos.faCode;
  facode = iconos.faCode;

}
