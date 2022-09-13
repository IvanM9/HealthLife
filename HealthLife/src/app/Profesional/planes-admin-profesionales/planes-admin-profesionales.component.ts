import { Component, OnInit } from '@angular/core';
import { Connection } from 'src/app/connection';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms'
import Swal from 'sweetalert2'


@Component({
  selector: 'app-planes-admin-profesionales',
  templateUrl: './planes-admin-profesionales.component.html',
  styleUrls: ['./planes-admin-profesionales.component.css']
})
export class PlanesAdminProfesionalesComponent implements OnInit {

  constructor(private api: Connection) { }

  planes: any[] = []
  ngOnInit(): void {
    this.api.get("actividades/obtener_planes/1").subscribe(res => {
      console.log(res)
      this.planes = Object.assign(res);
    })
  }


  mensajeMantenimiento() {
    Swal.fire({
      title: '¡Lo sentimos!',
      text: 'Esta opción aún no está disponible, seguiremos trabajando en futuras actualizaciones. Gracias por su comprensión.',
      imageUrl: 'https://ventaserviciospc.files.wordpress.com/2015/07/1.png?w=352&h=248',
      imageWidth: 200,
      imageHeight: 150,
      imageAlt: 'Custom image',
    })
  }

  nuevosPlanes = new FormGroup({
    nombre: new FormControl(null, Validators.required),
    estado: new FormControl(true),
    publico: new FormControl(false),
    objetivos: new FormControl(null, Validators.required),
    edad: new FormControl(0, Validators.required),
    etiquetas: new FormArray([new FormControl('#')]),
    IMC: new FormControl(0, Validators.required),
    enfermedades: new FormControl(null),
    actividades: new FormArray([
      new FormGroup({
        titulo: new FormControl(null, Validators.required),
        dia: new FormControl(1, Validators.required),
        detalles: new FormControl(null, Validators.required)
      })])
  })



  agregarEtiqueta() {
    this.nuevosPlanes.controls['etiquetas'].push(new FormControl('#'))
  }

  agregarActividades() {
    this.nuevosPlanes.controls['actividades'].push(
      new FormGroup({
        titulo: new FormControl(),
        dia: new FormControl(1),
        detalles: new FormControl()
      })
    )
  }

  eliminarActividad(actividad: number) {
    this.nuevosPlanes.controls['actividades'].removeAt(actividad);
  }

  eliminarEtiqueta(etiqueta: number) {
    this.nuevosPlanes.controls['etiquetas'].removeAt(etiqueta);
  }

  crearPlan() {
    console.log(this.nuevosPlanes.value)
    this.api.post("actividades/crearPlan", this.nuevosPlanes.value).subscribe(res => {
      console.log(res)
      alert("Se creó el plan correctamente")
      this.ngOnInit()
    }, error => {
      alert("No se ha podido crear el plan")
      console.log(error)
    })
    this.nuevosPlanes.reset();

  }

  idplan:number=0;
  abrirActividad(id:number){
    this.idplan = id
  }
}
