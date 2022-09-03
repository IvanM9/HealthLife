import { Connection } from './../../connection';
import { Component, Input, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  @Input() id!: number;
  actividades: any[] = []
  @Input() suscritos!: boolean;


  constructor(private api: Connection) { }

  ngOnInit(): void {
    //cambiar este /10 por el id traido del plan
    if (this.suscritos != null && this.suscritos == true) {
      this.api.get("suscripciones/actividades_suscritas/" + this.id).subscribe(res => {
        // console.log(res)
        //this.actividades.push(res);
        const aux = Object.assign(res)
        this.actividades = aux;
      }, error=>{
        console.error(error)
        alert(error.error.message);
      })
    }
    else {
      this.api.get("actividades/obtener_actividades/" + this.id).subscribe(res => {
        //this.actividades.push(res);
        const aux = Object.assign(res)
        this.actividades = aux;
      })
    }
  }

  completarActividades() {
    Swal.fire({
      icon: 'success',
      title: 'Esta actividad se ha registrado como Completada',
      showConfirmButton: false,
      timer: 1700
    })
  }


  faVerificado = iconos.faCircleCheck;

}
