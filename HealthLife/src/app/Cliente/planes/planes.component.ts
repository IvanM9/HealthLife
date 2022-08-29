import { Component, Input, OnInit } from '@angular/core';
import { CargarScriptsJSService } from 'src/app/cargar-scripts-js.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos';
import { Connection } from 'src/app/connection';


@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  plan:any;
  planes:any[] =[]
  detalle:boolean=false;
  @Input() id!:number;
  @Input() tipo!:number;
  constructor(private _cargarScripts:CargarScriptsJSService, private api:Connection) {
    _cargarScripts.CargarJS(["cliente/animacionmenu"]);
  }

  ngOnInit(): void {
    AOS.init();
    console.log(this.id)
    // Si es 1 es alimenticios, si es 2 es entrenamientos
    if(this.id == null || this.id ==0)
      this.api.get("suscripciones/obtener_planes_recomendados").subscribe(res=>{
        console.log(res)
        const aux = Object.assign(res)
        console.log(aux)
        aux.forEach((element: any) => {
          this.planes.push(element)
        });
      });
    else
      this.api.get("actividades/obtener_planes/"+this.id).subscribe(res=>{
        // console.log(res)
        // this.planes.push(res)
        const aux = Object.assign(res)
        console.log(aux)
        aux.forEach((element: any) => {
          this.planes.push(element)
        });
    });
    
    // this.planes.push({id:1})
    // this.planes.push({id:2})
    // this.planes.push({id:3})
    // this.planes.push({id:4})

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
