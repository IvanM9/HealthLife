import { Component, Input, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as iconosfab from '@fortawesome/free-brands-svg-icons';
import {CargarScriptsJSService} from './../../cargar-scripts-js.service'
import * as AOS from 'aos';

@Component({
  selector: 'app-detalle-plan',
  templateUrl: './detalle-plan.component.html',
  styleUrls: ['./detalle-plan.component.css']
})
export class DetallePlanComponent implements OnInit {

  @Input()
  idplan!: number;
  
  constructor() { }

  ngOnInit(): void {
    AOS.init();
    // Llamar al método de la API para mostrar los detalles
  }


  faUsuario = iconos.faUser;
  faVerificado = iconos.faCircleCheck;
  faReloj = iconos.faClock;
  faGratis = iconos.faUnlock;
  faObjetivos = iconos.faFlag;
  faItem = iconos.faCircleCheck;

}
