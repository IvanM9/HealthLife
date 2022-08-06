import { Component, OnInit } from '@angular/core';
import {CargarScriptsJSService} from '../../cargar-scripts-js.service';
import { Connection } from 'src/app/connection';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as iconosfab from '@fortawesome/free-brands-svg-icons';
import * as AOS from 'aos';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    correo: new FormControl('',Validators.required),
    clave: new FormControl('', Validators.required)
  })


  //Llamando a la función para poder cargar el JS que hace la animación del menú en la página de incio
  constructor(private conexion:Connection, private _cargarScripts:CargarScriptsJSService, private ruta:Router) { 
    _cargarScripts.CargarJSLogin(["login/login"]);
  }

  ngOnInit(): void {    
    AOS.init();
  }

  /*credenciales= {"correo":"","clave":""}
  loguear(){
    this.conexion.get("session/login").subscribe(res=>{
      let aux:any = Object.assign({},res)
      console.log(res)
      sessionStorage.setItem("token_id",aux.token) 
    })
    console.log(this.credenciales)
  }*/

  onLogin(form:any){
    console.log(form)
    this.conexion.post("session/login",form).subscribe(res => {
        const respuesta = Object.assign(res);
        console.log(res)
        sessionStorage.setItem("token_id",respuesta.token_id)
        this.ruta.navigateByUrl('/dashboard');

    }, error=>{
      console.log(error.error)
    })
  }

  faRevisar = iconos.faCircleCheck;
  faManos = iconos.faHandshakeAngle;
  faReloj = iconos.faClock;
  faUsuario = iconos.faUser;
  faCorazon = iconos.faHeartPulse;
  faPersona = iconos.faPersonRunning;
}
