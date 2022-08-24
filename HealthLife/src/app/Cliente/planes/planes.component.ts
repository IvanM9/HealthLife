import { Component, OnInit } from '@angular/core';
import { CargarScriptsJSService } from 'src/app/cargar-scripts-js.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

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
