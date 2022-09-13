import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Connection } from 'src/app/connection';

@Component({
  selector: 'app-actividades-admin-profesionales',
  templateUrl: './actividades-admin-profesionales.component.html',
  styleUrls: ['./actividades-admin-profesionales.component.css']
})
export class ActividadesAdminProfesionalesComponent implements OnInit {

  constructor(private api: Connection) { }

  @Input() idplan?: number;
  actividades: any[] = []
  ngOnInit() {
    moment.locale('ES')
    this.api.get("actividades/obtener_actividades/" + this.idplan).subscribe(res => {
      this.actividades = Object.assign(res);
      this.actividades.forEach(element => {
        element.dia = moment().day(element.dia).format('dddd')
      });

    }, error => {
      console.log(error)
      alert("Error al obtener las actividades")
    });
  }

  eliminarActividad(idactividad: number) {
    this.api.delete("actividades/eliminarActividad/"+idactividad).subscribe(res => {
      console.log(res);
      this.ngOnInit()
    }, error => {
      alert("Error al eliminar la actividad")
    });
  }

}
