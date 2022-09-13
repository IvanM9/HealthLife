import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Connection } from 'src/app/connection';

@Component({
  selector: 'app-perfil-profesional',
  templateUrl: './perfil-profesional.component.html',
  styleUrls: ['./perfil-profesional.component.css']
})
export class PerfilProfesionalComponent implements OnInit {

  constructor(private api: Connection) { }

  @Input() id!: number;
  datos: any;
  ngOnInit(): void {
    this.api.get('profesional/perfil/' + (this.id || 0)).subscribe(res => {
      this.datos = Object.assign(res);
      this.datos.rol = sessionStorage.getItem("rol");
      this.profesional.patchValue({
        nombres: this.datos.nombres,
        apellidos: this.datos.apellidos,
        descripcion: this.datos.descripcion,
        links: this.datos.perfiles
      })
      console.log(res)
    }, error => {
      alert(error.error);
    }
    );
  }

  profesional = new FormGroup({
    nombres: new FormControl(),
    apellidos: new FormControl(),
    descripcion: new FormControl(),
    links: new FormArray([ new FormControl()])
  });

  eliminarLink(link:number){
    this.profesional.controls['links'].removeAt(link)
  }
  agregarLink(){
    this.profesional.controls['links'].push(new FormControl())
  }

  actualizarPerfil(datos:any){
    this.api.put("profesional/perfil/modificar", datos).subscribe(res=>{
      console.log(res)
      alert("Datos actualizados correctamente")
    }, error=>{
      console.log(error)
      alert("Error al actualizar los datos")
    });
  }
}
