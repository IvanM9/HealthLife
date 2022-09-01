import { Component, OnInit } from '@angular/core';
import { Connection } from 'src/app/connection';
import { FormGroup, FormControl, FormArray } from '@angular/forms'
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
      const aux = Object.assign(res);
      aux.forEach((element: any) => {
        this.planes.push(element)
      });
    })
  }


  mensajeMantenimiento(){
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
    nombre: new FormControl(),
    estado: new FormControl(true),
    publico: new FormControl(false),
    objetivos: new FormControl(),
    edad: new FormControl(0),
    etiquetas: new FormArray([new FormControl('#')]),
    IMC: new FormControl('0'),
    enfermedades: new FormControl(),
    actividades: new FormArray([
      new FormGroup({
        titulo: new FormControl(''),
        dia: new FormControl(1),
        detalles: new FormControl()
      })])
  })



  agregarEtiqueta() {
    this.nuevosPlanes.controls['etiquetas'].push(new FormControl('#'))
  }

  agregarActividades() {
    this.nuevosPlanes.controls['actividades'].push(
      new FormGroup({
        titulo: new FormControl(''),
        dia: new FormControl(1),
        detalles: new FormControl()
      })
    )
  }

  crearPlan() {
    console.log(this.nuevosPlanes.controls['IMC'].value?.toString())
    this.nuevosPlanes.controls['IMC'].setValue(this.nuevosPlanes.controls['IMC'].value?.toString() || '0')
    console.log(this.nuevosPlanes.value)
    this.api.post("actividades/crearPlan", this.nuevosPlanes.value).subscribe(res => {
      console.log(res)
      this.ngOnInit()
    }, error => {
      console.log(error)
    })
  }
}
