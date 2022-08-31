import { Component, Input, OnInit } from '@angular/core';
import { Connection } from 'src/app/connection';

@Component({
  selector: 'app-perfil-profesional',
  templateUrl: './perfil-profesional.component.html',
  styleUrls: ['./perfil-profesional.component.css']
})
export class PerfilProfesionalComponent implements OnInit {

  constructor(private api:Connection) { }

  @Input() id!:number;
  datos:any;
  ngOnInit(): void {
    this.api.get('profesional/perfil/'+(this.id||0)).subscribe(res=>{
        this.datos= Object.assign(res);
        this.datos.rol= sessionStorage.getItem("rol");
        console.log(res)
    }, error=>{
      alert(error.error);
    }
    );
  }

}
