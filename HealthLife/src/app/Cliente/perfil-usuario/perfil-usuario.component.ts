import { Component, Input, OnInit } from '@angular/core';
import { Connection } from 'src/app/connection';
import * as AOS from 'aos';
import Swal from 'sweetalert2'

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

}
