import { Component, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as AOS from 'aos';
import { Connection } from 'src/app/connection';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-mis-planes',
  templateUrl: './mis-planes.component.html',
  styleUrls: ['./mis-planes.component.css']
})
export class MisPlanesComponent implements OnInit {

  plan: any;
  detalle:boolean=false;
  misPlanes:any[] =[]
  nombreProfesional: any;
  constructor(private api:Connection) { 
    
  }

  ngOnInit(): void {
    this.api.get("suscripciones/planes_suscritos").subscribe(res=>{
      const aux = Object.assign(res);
      console.log(res)
      this.misPlanes = aux;
      
      this.misPlanes.forEach((element: any) => {
        this.api.get("profesional/perfil/"+element.id_profesional).subscribe(res=>{
          const aux2 = Object.assign(res);
          element.nombres = aux2.nombres + " " + aux2.apellidos;
        }, error=>{
          this.noSePuedeObtenerProfesionales();
        });
     });

      

    }, error=>{
      alert("No hay planes suscritos")
    });
  }


  //Inidice para mostrar componentes dentro del dashboard
  cambiarIndice(plan: any){
    this.plan = plan;
  }
  cambiarComponente(activo:boolean){
    this.detalle = activo;
  }

  noSePuedeObtenerProfesionales() {
    Swal.fire({
      icon: 'error',
      title: 'Lo sentimos :(',
      text: 'No se ha podido obtener la información de los profesionales',
    })
  }


  faUsuario = iconos.faUser;
  faVerificado = iconos.faCircleCheck;
  faReloj = iconos.faClock;
  faGratis = iconos.faUnlock;
}
