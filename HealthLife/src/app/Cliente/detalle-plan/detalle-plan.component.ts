import { Connection } from './../../connection';
import { Component, Input, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as iconosfab from '@fortawesome/free-brands-svg-icons';
import {CargarScriptsJSService} from './../../cargar-scripts-js.service'
import * as AOS from 'aos';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-detalle-plan',
  templateUrl: './detalle-plan.component.html',
  styleUrls: ['./detalle-plan.component.css']
})
export class DetallePlanComponent implements OnInit {

  @Input()
  plan!: any;

  detallePlan:any[] =[]
  
  constructor(private api:Connection) { }

  ngOnInit(): void {
    AOS.init();
    // Llamar al método de la API para mostrar los detalles
    this.api.get("actividades/obtener_actividades/"+this.plan.id_planes).subscribe(res=>{
      const aux = Object.assign(res)
      aux.forEach((element: any) => {
         this.detallePlan.push(element)
      });
      console.log(this.detallePlan)
    })
  }


  suscribirse(){
    console.log(this.plan)
    this.api.post("suscripciones/suscribirse", {id_plan: this.plan.id_planes}).subscribe(res => {
      const respuesta = Object.assign(res);
      console.log(respuesta)
      Swal.fire({
        icon: 'success',
        title: 'Te has suscrito correctamente al plan ' + this.plan.nombre,
        showConfirmButton: false,
        timer: 1500
      })
    }, error =>{
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'No hemos podidos suscribirte en este plan, inténtalo más tarde',
        showConfirmButton: false,
        timer: 1650
      })
    })
  }

  

  /*obtenerDetallePlan(){
    this.api.get("suscripciones/obtener_planes_generales").subscribe(res=>{
      const aux = Object.assign(res)
      aux.forEach((element: any) => {
        if(this.idplan == element.id_planes){
          this.detallePlan = (element)
        }
      });
    })
  }*/

  faUsuario = iconos.faUser;
  faVerificado = iconos.faCircleCheck;
  faReloj = iconos.faClock;
  faGratis = iconos.faUnlock;
  faObjetivos = iconos.faFlag;
  faItem = iconos.faCircleCheck;

}
