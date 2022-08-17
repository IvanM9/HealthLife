import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  //Form para loguearse
  loginForm = new FormGroup({
    correo: new FormControl('',Validators.required),
    clave: new FormControl('', Validators.required)
  })

  //@ViewChild("checkbox") public checkbox: ElementRef

  //Form para registrar a los clientes
  registroClienteForm = new FormGroup({
    nombres: new FormControl('',Validators.required),
    apellidos: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required),
    talla: new FormControl(''),
    peso: new FormControl(''),
    habitos: new FormControl(''),
    alergias: new FormControl(''),
    enfermedades: new FormControl(''),
    detalles_extras: new FormControl('')
  })

  //Form para registrar a los profesionales
  registroProfesionalesForm = new FormGroup({
    nombres: new FormControl('',Validators.required),
    apellidos: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required),
    descripcion: new FormControl(null),
    links: new FormControl(null),
    rol: new FormControl('seleccione-rol', Validators.required)
  })


  //Llamando a la función para poder cargar el JS que hace la animación del menú en la página de incio
  constructor(private conexion:Connection, private _cargarScripts:CargarScriptsJSService, private ruta:Router) { 

  }

  ngOnInit(): void {  
    this._cargarScripts.CargarJSLogin(["login/login"]);
    AOS.init();
  }

  //Función para loguearse al hacer click
  onLogin(loginForm:any){
    this.conexion.post("session/login",loginForm).subscribe(res => {
        const respuesta = Object.assign(res);
        console.log(res)
        sessionStorage.setItem("token_id",respuesta.token_id)
        //Agregado, falta en la API
        sessionStorage.setItem("nombreUsuario",respuesta.nombres)
        this.mensaje_OK_Login();
        if(respuesta.rol == 'cliente'){
          this.ruta.navigateByUrl('/dashboard');
        }
        else{
          this.ruta.navigateByUrl('/inicio');
        }
    }, error=>{
      console.log(error.error)
      this.mensaje_Error_Login();
    })
  }

  //Función para registrar usuarios, al hacer click en "Registrarme"
  registrarUsuario(registroClienteForm:any){
    this.conexion.post("session/registrar/cliente",registroClienteForm).subscribe(res => {
      const respuesta = Object.assign(res);
      console.log(res)
      this.onLogin({correo:registroClienteForm.correo, clave: registroClienteForm.clave})
      //console.log({correo:registroClienteForm.correo, clave: registroClienteForm.clave})
    }, error=>{
      console.log(error.error)
      this.mensaje_Error_Registro();
    })
  }

  //Función para registrar profesionales, al hacer click en "Registrarme"
  registrarProfesionales(registroProfesionalesForm:any){
    console.log(registroProfesionalesForm);
    this.conexion.post("session/registrar/profesional",registroProfesionalesForm).subscribe(res => {
      const respuesta = Object.assign(res);
      console.log(res)
      this.mensaje_OK_Registro();
      this.ruta.navigateByUrl('/login');
    }, error=>{
      console.log(error.error)
      this.mensaje_Error_Registro();
    })
  }

  //Mensaje de usuario logueado correctamente
  mensaje_OK_Login() {
    Swal.fire({
      icon: 'success',
      title: 'Iniciaste sesión correctamente',
      showConfirmButton: false,
      timer: 1500
    })
  }

  //Mensaje de error por si las credenciales ingresadas son incorrectas
  mensaje_Error_Login() {
    Swal.fire({
      icon: 'error',
      title: 'Oops..',
      text: 'Credenciales incorrectas',
      showConfirmButton: false,
      timer: 1500
    });
  }

  //Mensaje de OK al registrar el usuario o profesional
  mensaje_OK_Registro() {
    Swal.fire({
      icon: 'success',
      title: 'Te registraste correctamente en HealthLife',
      showConfirmButton: false,
      timer: 1500
    })
  }

  //Mensaje de error para registro por si ocurre problemas con la API
  mensaje_Error_Registro() {
    Swal.fire({
      icon: 'error',
      title: 'Oops..',
      text: 'No se ha podido registrar en estos momentos :(',
      showConfirmButton: false,
      timer: 2200
    });
  }

  
  public verificarPassword(password1:string, password2:String){
    if(password1 != password2){
      this.mensaje_Password_Diferentes();
    }
  }

  mensaje_Password_Diferentes(){
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Las contraseñas no coinciden, intente otra vez',
      showConfirmButton: false,
      timer: 1650
    })
  }


  //Iconos
  faRevisar = iconos.faCircleCheck;
  faManos = iconos.faHandshakeAngle;
  faReloj = iconos.faClock;
  faUsuario = iconos.faUser;
  faCorazon = iconos.faHeartPulse;
  faPersona = iconos.faPersonRunning;
  faZapato = iconos.faShoePrints;
  faAltura = iconos.faRuler;
  faPeso = iconos.faWeightScale;
  faHabitos = iconos.faAppleWhole;
  faAlergias = iconos.faHandDots;
  faEnfermedades = iconos.faBookMedical;

  faEmail = iconos.faEnvelope;
  faClave = iconos.faLock;
}
