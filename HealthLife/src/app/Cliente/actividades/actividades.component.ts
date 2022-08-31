import { Connection } from './../../connection';
import { Component, Input, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  @Input() id!:number;
  actividades:any[] =[]


  constructor(private api:Connection) { }

  ngOnInit(): void {
    //cambiar este /10 por el id traido del plan
    this.api.get("actividades/obtener_actividades/"+this.id).subscribe(res=>{
      //this.actividades.push(res);
      const aux = Object.assign(res)
      aux.forEach((element: any) => {
        this.actividades.push(element)
      });
    })
  }

  faVerificado = iconos.faCircleCheck;

}
