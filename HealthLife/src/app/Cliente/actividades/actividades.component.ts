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

  actividadesCompletadas: any[] = []

  constructor(private api: Connection) { }

  ngOnInit(): void {
    //cambiar este /10 por el id traido del plan
    if (this.suscritos != null && this.suscritos) {
      this.api.get("suscripciones/actividades_suscritas/" + this.id).subscribe(res => {
        // console.log(res)
        //this.actividades.push(res);
        const aux = Object.assign(res)
        this.actividades = aux;
        // this.api.get("actividades/"+this.id).subscribe(res=>{
        //   this.actividadesCompletadas = Object.assign(res)
        //   console.log(this.actividadesCompletadas)
        // }, error=>{
        //   console.error(error);
        // });
      }, error=>{
        console.log(error)
        alert(error.error.message);
      })
    }
    else {
      this.api.get("actividades/obtener_actividades/" + this.id).subscribe(res => {
        //this.actividades.push(res);
        const aux = Object.assign(res)
        this.actividades = aux;
      }, error=>{
        console.error(error)
        alert(error.error.message);
      })
    }
  }


  completarActividades(idActividad:number) {
    const datos = {
      "idActividad": idActividad,
      "realizado": true
    }
    console.log(datos)
    this.api.post("actividades/registrar",datos).subscribe(res=>{
      this.actividadesCompletadas.push(idActividad)
      Swal.fire({
        icon: 'success',
        title: 'Esta actividad se ha registrado como Completada',
        showConfirmButton: false,
        timer: 1700
      })
    }, error=>{
      alert("Error")
      console.log(error)
    });
    
  }


  faVerificado = iconos.faCircleCheck;

}
