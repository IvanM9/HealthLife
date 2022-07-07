import { Component, OnInit } from '@angular/core';
import { Connection } from 'src/app/connection';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private conexion:Connection) { }

  ngOnInit(): void {
  }

  credenciales= {"correo":"","clave":""}
  loguear(){
    this.conexion.get("",).subscribe(res=>{
      let aux:any = Object.assign({},res)
      console.log(aux)
      sessionStorage.setItem("token_id",aux.token) 
    })
    console.log(this.credenciales)
  }

 

}
