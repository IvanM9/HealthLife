import { Component, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos';
import { Connection } from 'src/app/connection';

@Component({
  selector: 'app-mis-planes',
  templateUrl: './mis-planes.component.html',
  styleUrls: ['./mis-planes.component.css']
})
export class MisPlanesComponent implements OnInit {

  plan: any;
  detalle:boolean=false;
  misPlanes:any[] =[]

  constructor(private api:Connection) { 
    
  }

  ngOnInit(): void {
  }


  //Inidice para mostrar componentes dentro del dashboard
  cambiarIndice(plan: any){
    this.plan = plan;
  }
  cambiarComponente(activo:boolean){
    this.detalle = activo;
  }


  faUsuario = iconos.faUser;
  faVerificado = iconos.faCircleCheck;
  faReloj = iconos.faClock;
  faGratis = iconos.faUnlock;
}
