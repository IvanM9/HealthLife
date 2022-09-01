import { Component, OnInit } from '@angular/core';
import { Connection } from 'src/app/connection';

@Component({
  selector: 'app-clientes-admin-profesionales',
  templateUrl: './clientes-admin-profesionales.component.html',
  styleUrls: ['./clientes-admin-profesionales.component.css']
})
export class ClientesAdminProfesionalesComponent implements OnInit {

  constructor(private api: Connection) { }

  clients: any[] = [];
  idUsuario: number = 0;
  cargarDatos=false;
  ngOnInit(): void {
    this.api.get("actividades/obtenerClientesSuscritos").subscribe(res => {
      const aux = Object.assign(res)
      console.log(res);
      this.clients=aux;
    }, error => {
      console.log(error);
    })
  }

  mostrarPerfil(id: number): void {
    this.idUsuario = id;
    this.mostrarDatos(true)
    console.log(this.idUsuario)
  }

  mostrarDatos(cargar:boolean){
    this.cargarDatos=cargar

  }

}
