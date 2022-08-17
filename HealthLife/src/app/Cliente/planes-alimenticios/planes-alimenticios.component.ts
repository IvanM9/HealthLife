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

  constructor(private _cargarScripts:CargarScriptsJSService) {
    _cargarScripts.CargarJS(["cliente/animacionmenu"]);
  }

  ngOnInit(): void {
  }

  infoCirculo = iconos.faInfoCircle;

}
