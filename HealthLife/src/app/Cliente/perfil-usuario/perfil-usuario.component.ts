import { Component, Input, OnInit } from '@angular/core';
import { Connection } from 'src/app/connection';
import * as AOS from 'aos';
import Swal from 'sweetalert2'
import { FormControl, FormGroup } from '@angular/forms';
import { faTabletAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  @Input() id!: number;
  constructor(private api: Connection) { }

  datos:any
  ngOnInit(): void {

      this.api.get("cliente/perfil/" + (this.id || 0)).subscribe(res => {
        console.log(res)
        this.datos = Object.assign(res);
        this.nuevoDatos.patchValue({
          nombres: this.datos.nombres,
          apellidos: this.datos.apellidos,
          habitos: this.datos.habitos,
          alergias: this.datos.alergias,
          enfermedades: this.datos.enfermedades,
          detalles_extras: this.datos.detalles_extras,
          talla: this.datos.talla,
          peso: this.datos.peso
        });
      }, error=>{
        console.log(error.error)
      });
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

  nuevoDatos = new FormGroup({
    nombres: new FormControl(),
    apellidos: new FormControl(),
    habitos: new FormControl(),
    alergias: new FormControl(),
    enfermedades: new FormControl(),
    detalles_extras: new FormControl(),
    talla: new FormControl(),
    peso: new FormControl()

  });
  modificarDatos(){
    this.nuevoDatos.patchValue({
      talla: this.nuevoDatos.controls['talla'].value.toString(),
      peso: this.nuevoDatos.controls['peso'].value.toString()
    })
    console.log(this.nuevoDatos.value);
    this.api.put("cliente/perfil/modificarPerfil", this.nuevoDatos.value).subscribe(res=>{
      alert("Datos modificados")
    }, error=>{
      alert("No se ha podido modificar los datos")
      console.log(error)
    });
  }

}
