import { Component, OnInit } from '@angular/core';
import { Connection } from 'src/app/connection';

@Component({
  selector: 'app-clientes-admin-profesionales',
  templateUrl: './clientes-admin-profesionales.component.html',
  styleUrls: ['./clientes-admin-profesionales.component.css']
})
export class ClientesAdminProfesionalesComponent implements OnInit {

  constructor(private api:Connection) { }

  clients:any[] = [];
  ngOnInit(): void {
    this.api.get("actividades/obtenerClientesSuscritos").subscribe(res=>{
      const aux = Object.assign(res)
      console.log(res);
      aux.forEach((element: any)=>{
        this.clients.push(element);
      });
    }, error=>{
      console.log(error);
    })
  }

}
