import { Component, OnInit } from '@angular/core';
import {CargarScriptsJSService} from './../cargar-scripts-js.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as iconosfab from '@fortawesome/free-brands-svg-icons';
import * as AOS from 'aos';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  //Llamando a la función para poder cargar el JS que hace la animación del menú en la página de incio
  constructor(private _cargarScripts:CargarScriptsJSService) {
    _cargarScripts.CargarJS(["inicio/main"]);
  }


  //Contador que se va incrementando en la sección de contador de la página de inicio
  //Contador de los usuarios
  usuariosCont:number = -20;
  usuariosStop:any = setInterval(()=>{
    this.usuariosCont++;
    if(this.usuariosCont == 350){
      clearInterval(this.usuariosStop)
    }
  },1)

  //Contador de los profesionales
  profesionalesCont:number = 0;
  profesionalesStop:any = setInterval(()=>{
    this.profesionalesCont++;
    if(this.profesionalesCont == 100){
      clearInterval(this.profesionalesStop)
    }
  },12)

  //Contador de las comidas
  comidasCont:number = 0;
  comidasStop:any = setInterval(()=>{
    this.comidasCont++;
    if(this.comidasCont == 260){
      clearInterval(this.comidasStop)
    }
  },5)

  //Contador de los ejercicios
  ejerciciosCont:number = 0;
  ejerciciosStop:any = setInterval(()=>{
    this.ejerciciosCont++;
    if(this.ejerciciosCont == 200){
      clearInterval(this.ejerciciosStop)
    }
  },5)




  ngOnInit(): void {
    AOS.init();
  }

  //Iconos
  faUsuarios = iconos.faUsers;
  faLibros = iconos.faBook;
  faEstadisticas = iconos.faChartSimple;
  faFlechaAbajo = iconos.faAngleDown;
  faFlechaEmpezar = iconos.faAngleRight;
  faRevisar = iconos.faCircleCheck;
  faLista = iconos.faListCheck;
  faPremios = iconos.faTrophy;
  

  faPlayStore = iconosfab.faGooglePlay;

}
