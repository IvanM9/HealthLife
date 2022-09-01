import { CargarScriptsJSService } from './../../cargar-scripts-js.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  constructor(private _cargarScripts:CargarScriptsJSService) { 

  }

  ngOnInit(): void {
    this._cargarScripts.CargarJS(["estadisticas/estadisticas"]);
  }

}
