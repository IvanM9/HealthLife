import { Component, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as iconosfab from '@fortawesome/free-brands-svg-icons';
import {CargarScriptsJSService} from './../../cargar-scripts-js.service'

@Component({
  selector: 'app-planes-alimenticios',
  templateUrl: './planes-alimenticios.component.html',
  styleUrls: ['./planes-alimenticios.component.css']
})
export class PlanesAlimenticiosComponent implements OnInit {

  indice = 0;
  planes:any[] =[]
  detalle:boolean=false;

  constructor(private _cargarScripts:CargarScriptsJSService) {
    _cargarScripts.CargarJS(["cliente/animacionmenu"]);
  }

  ngOnInit(): void {
    this.planes.push({id:0})
    this.planes.push({id:1})
    this.planes.push({id:2})
    this.planes.push({id:3})
    this.planes.push({id:4})

  }

  //Inidice para mostrar componentes dentro del dashboard
  cambiarIndice(indice: any){
    this.indice = indice;
  }
  cambiarComponente(activo:boolean){
    this.detalle = activo;
  }

  faUsuario = iconos.faUser;

  faVerificado = iconos.faCircleCheck;
  faReloj = iconos.faClock;
  faGratis = iconos.faUnlock;

}
