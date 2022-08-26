import { Component, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { Connection } from 'src/app/connection';
import * as AOS from 'aos';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.css']
})
export class ProfesionalesComponent implements OnInit {

  indice = 0;
  nProfesionales = 9
  detalle:boolean = false;
  profesionales:any


  constructor(private api:Connection) { }

  ngOnInit(): void {
    AOS.init();
    //Para mostrar el numero de profesionales
    this.api.get("actividades/obtener_profesionales").subscribe( res =>{
      
      console.log(res)
      this.profesionales = res
    })
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
