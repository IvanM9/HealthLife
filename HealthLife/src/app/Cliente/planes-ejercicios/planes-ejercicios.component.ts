import { Component, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as iconosfab from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-planes-ejercicios',
  templateUrl: './planes-ejercicios.component.html',
  styleUrls: ['./planes-ejercicios.component.css']
})
export class PlanesEjerciciosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  faVerificado = iconos.faCircleCheck;
  faReloj = iconos.faClock;
  faGratis = iconos.faUnlock;

}
