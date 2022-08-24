import { Component, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent implements OnInit {

  indice = 0;
  nProfesionales = 9
  detalle:boolean = false;
  profesionales:any[] =[]


  constructor() { }

  ngOnInit(): void {
    //Para mostrar el numero de profesionales
    for(let i=0; i< 10; i++){
      this.profesionales.push({id:i})
    }
  }

  //Cambiando el índice
  cambiarIndice(indice: any){
    this.indice = indice;
  }

  //Cambiando de componente para regresar
  cambiarComponente(activo:boolean){
    this.detalle = activo;
  }
  
  faFlecha = iconos.faCircleRight;
}
