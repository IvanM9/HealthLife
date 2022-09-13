import { Component, Input, OnInit } from '@angular/core';
import { CargarScriptsJSService } from 'src/app/cargar-scripts-js.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos';
import { Connection } from 'src/app/connection';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  portadaNutricion = "https://res.cloudinary.com/dfzyxagbc/image/upload/v1662002549/healthlife/portada-plan-comidas_u3vrmz.png"
  portadaEjercicios = "https://res.cloudinary.com/dfzyxagbc/image/upload/v1662002548/healthlife/portada-plan-entreanamientos_wnlujj.png"
  plan: any;
  planes: any[] = []
  detalle: boolean = false;
  @Input() id!: number;
  @Input() tipo!: number;
  constructor(private _cargarScripts: CargarScriptsJSService, private api: Connection) {
    _cargarScripts.CargarJS(["cliente/animacionmenu"]);
  }

  ngOnInit(): void {
    AOS.init();
    console.log(this.id)
    // Si es 1 es alimenticios, si es 2 es entrenamientos
    if (this.id == null) {
      if (this.tipo != null)
        this.api.get("suscripciones/obtener_planes_generales/" + this.tipo).subscribe(res => {
          console.log(res)
          const aux = Object.assign(res)
          console.log(aux)
          aux.forEach((element: any) => {
            this.planes.push(element)

            this.api.get("profesional/perfil/"+element.id_profesional).subscribe(res=>{
              const aux2 = Object.assign(res);
              element.nombres = aux2.nombres + " " + aux2.apellidos;
            }, error=>{
              /*this.noSePuedeObtenerProfesionales();*/
            });
          });
        }, error=>{
          alert("No se encontraron planes")
        });
      else
        this.api.get("suscripciones/obtener_planes_recomendados").subscribe(res => {
          const aux = Object.assign(res)
          console.log(aux)
          aux.forEach((element: any) => {
            this.planes.push(element) 

            this.api.get("profesional/perfil/"+element.id_profesional).subscribe(res=>{
              const aux2 = Object.assign(res);
              element.nombres = aux2.nombres + " " + aux2.apellidos;
            }, error=>{
              /*this.noSePuedeObtenerProfesionales();*/
            });
          });
        });
    }
    else {
      this.api.get("actividades/obtener_planes/" + this.id).subscribe(res => {
        console.log(res)
        const aux = Object.assign(res)
        console.log(aux)
        aux.forEach((element: any) => {
          this.planes.push(element)

          this.api.get("profesional/perfil/"+element.id_profesional).subscribe(res=>{
            const aux2 = Object.assign(res);
            element.nombres = aux2.nombres + " " + aux2.apellidos;
          }, error=>{
            /*this.noSePuedeObtenerProfesionales();*/
          });
        });
      });
    }

  }

  /*noSePuedeObtenerProfesionales() {
    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos :(',
      text: 'No se ha podido obtener la información de los profesionales',
    })
  }*/

  //Inidice para mostrar componentes dentro del dashboard
  cambiarIndice(plan: any) {
    this.plan = plan;
  }
  cambiarComponente(activo: boolean) {
    this.detalle = activo;
  }

  faUsuario = iconos.faUser;
  faVerificado = iconos.faCircleCheck;
  faReloj = iconos.faClock;
  faGratis = iconos.faUnlock;

}
