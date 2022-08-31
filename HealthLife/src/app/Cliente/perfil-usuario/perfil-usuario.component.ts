import { Component, Input, OnInit } from '@angular/core';
import { Connection } from 'src/app/connection';

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
        this.datos = Object.assign(res);
      }, error=>{
        console.log(error.error)
      });
    
   
  }

}
