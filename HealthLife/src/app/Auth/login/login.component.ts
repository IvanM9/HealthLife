import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CargarScriptsJSService } from '../../cargar-scripts-js.service';
import { Connection } from 'src/app/connection';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import * as iconosfab from '@fortawesome/free-brands-svg-icons';
import * as AOS from 'aos';
import { FormGroup, FormControl, Validators } from '@angular/forms'
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
    correo: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required)
  })

  //Form para registrar a los clientes
  registroClienteForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.email),
    clave: new FormControl('', Validators.required),
    talla: new FormControl('', Validators.required),
    peso: new FormControl('', Validators.required),
    sexo: new FormControl('seleccione-genero', Validators.required),
    habitos: new FormControl(''),
    alergias: new FormControl(''),
    enfermedades: new FormControl(''),
    detalles_extras: new FormControl('')
  })

  //Form para registrar a los profesionales
  registroProfesionalesForm = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required),
    sexo: new FormControl('seleccione-genero', Validators.required),
    descripcion: new FormControl('', Validators.required),
    links: new FormControl(null),
    rol: new FormControl('seleccione-rol', Validators.required)
  })


  //Llamando a la función para poder cargar el JS que hace la animación del menú en la página de incio
  constructor(private conexion: Connection, private _cargarScripts: CargarScriptsJSService, private ruta: Router) {

  }

  ngOnInit(): void {
    this._cargarScripts.CargarJSLogin(["login/login"]);
    AOS.init();
  }

  //Función para loguearse al hacer click
  onLogin(loginForm: any) {
    this.conexion.post("session/login", loginForm).subscribe(res => {
      const respuesta = Object.assign(res);
      console.log(res)
      sessionStorage.setItem("token_id", respuesta.token_id)
      //Agregado, falta en la API
      sessionStorage.setItem("nombreUsuario", respuesta.nombres)
      sessionStorage.setItem("rol", respuesta.rol)
      this.mensaje_OK_Login();
      if (respuesta.rol == 'cliente') {
        this.ruta.navigateByUrl('/dashboard');
      }
      else {
        this.ruta.navigateByUrl('/dashboard');
      }
    }, error => {
      console.log(error.error)
      this.mensaje_Error("Credenciales incorrectas");
    })
  }

  //Función para registrar usuarios, al hacer click en "Registrarme"
  registrarUsuario(registroClienteForm: any, checkbox: any) {
    if (checkbox) {
      registroClienteForm.talla = registroClienteForm.talla.toString();
      registroClienteForm.peso = registroClienteForm.peso.toString();
      console.log(registroClienteForm);
      this.conexion.post("session/registrar/cliente", registroClienteForm).subscribe(res => {
        const respuesta = Object.assign(res);
        console.log(res)
        this.onLogin({ correo: registroClienteForm.correo, clave: registroClienteForm.clave })
        //console.log({correo:registroClienteForm.correo, clave: registroClienteForm.clave})
      }, error => {
        console.log(error.error)
        this.mensaje_Error("No lo hemos podido registrar en HealthLife :(");
      })
    }
    else {
      this.mensaje_Error("Debe aceptar las políticas de privacidad para usuarios")
    }

  }

  //Función para registrar profesionales, al hacer click en "Registrarme"
  registrarProfesionales(registroProfesionalesForm: any, checkbox: any) {
    if (checkbox) {
      console.log(registroProfesionalesForm);
      this.conexion.post("session/registrar/profesional", registroProfesionalesForm).subscribe(res => {
        const respuesta = Object.assign(res);
        console.log(res)
        this.onLogin({ correo: registroProfesionalesForm.correo, clave: registroProfesionalesForm.clave })
      }, error => {
        console.log(error.error)
        this.mensaje_Error("No lo hemos podido registrar en HealthLife :(");
      })
    }
    else{
      this.mensaje_Error("Debe aceptar las políticas de privacidad para profesionales");
    }
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
  mensaje_Error(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops..',
      text: mensaje,
      showConfirmButton: false,
      timer: 2200
    });
  }

  politicasPrivacidadUsuarios(){
    Swal.fire({
      icon: 'info',
      title: 'Politicas de privacidad',
      html: '<p style="text-align: justify;"> 1. Aceptar que HealthLife recopile su información personal para poder registrarlo/a en la base de datos.</p>' + 
            '<p style="text-align: justify;"> 2. Aceptar que no se puede tomar la información de los cursos de los profesionales para usarlas o duplicarlas en otros sitios. </p>'+
            '<p style="text-align: justify;"> 3. Aceptar que HealthLife es un sistema web gratuito con funcionalidades básicas para un grupo de usuarios.</p>' +
            '<p style="text-align: justify;"> 4. Se puede tomar de manera libre el código de HealthLife y colobarar en el sistema para incluir mejoras.</p>' +
            '<p style="text-align: justify;"> 5. Aceptar que HealthLife no se responsabiliza por robo de información que se haya introducido en el sistema.</p>' + 
            '<p style="text-align: justify;"> 6. Aceptar que HealthLife puede estar en mantenimiento en cualquier momento por ser un software libre y de versión 1.0.</p>'            
    })
  }

  politicasPrivacidadProfesionales(){
    Swal.fire({
      icon: 'info',
      title: 'Politicas de privacidad',
      html: '<p style="text-align: justify;"> 1. Aceptar que HealthLife recopile su información personal para poder registrarlo/a en la base de datos.</p>' + 
            '<p style="text-align: justify;"> 2. Aceptar que no se puede tomar la información de los usuarios inscritos en HealthLife para cualquier tipo de actividad. </p>'+
            '<p style="text-align: justify;"> 3. Aceptar que HealthLife es un sistema web gratuito con funcionalidades básicas para un grupo de usuarios.</p>' +
            '<p style="text-align: justify;"> 4. Se puede tomar de manera libre el código de HealthLife y colobarar en el sistema para incluir mejoras.</p>' +
            '<p style="text-align: justify;"> 5. Aceptar que HealthLife no se responsabiliza por robo de información que se haya introducido en el sistema.</p>' + 
            '<p style="text-align: justify;"> 6. Aceptar que HealthLife puede estar en mantenimiento en cualquier momento por ser un software libre y de versión 1.0.</p>'            
    })
  }


  obtenerAyuda(){
    Swal.fire({
      title: '¡Lo sentimos!',
      text: 'Por el momento no contamos con un personal que recepte solicitudes de ayudas :(. Gracias por su comprensión.',
      imageUrl: 'https://www.questionpro.com/qp_userimages/sub-3/2800039/calculadora-margen-de-error.png',
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }

  public verificarPassword(password1: string, password2: String) {
    if (password1 != password2) {
      this.mensaje_Error("Las contraseñas no son iguales, intente otra vez");
    }
  }

  public verificarPassword2(password1: string, password2: String) {
    if (password1 != password2) {
      this.mensaje_Error("Las contraseñas no son iguales, intente otra vez");
    }
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
  faDescripcionPerfil = iconos.faAddressCard;
  //faHabitos = iconos.faAppleWhole;
  faAlergias = iconos.faHandDots;
  faEnfermedades = iconos.faBookMedical;

  faEmail = iconos.faEnvelope;
  faClave = iconos.faLock;
}
