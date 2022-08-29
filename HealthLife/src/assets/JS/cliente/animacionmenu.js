const toggle_btn = document.querySelectorAll(".menu-perfil");

let ubicacionPrincipal = window.pageYOffset; //Empieza midiendo 0

//inicializando las animaciones ventanas

window.addEventListener("scroll", function(){
    let desplazamientoActual = window.pageYOffset;
    if(ubicacionPrincipal>=desplazamientoActual){
        this.document.getElementsByTagName("nav")[0].style.top = "0px" 
    }
    else{
        this.document.getElementsByTagName("nav")[0].style.top = "-100px"
    }
    //Le volvemos a dar la ubicación principal para que se actualice constantemente
    ubicacionPrincipal = desplazamientoActual; 
})


//----------------------------Menu abrir y cerrar--------------------------------//
let = enlacesMenu = document.querySelectorAll(".opciones-menu")[0];
let semaforo = true;

document.querySelectorAll(".menu")[0].addEventListener("click", function(){
    if(semaforo){
        document.querySelectorAll(".menu")[0].style.color="#fff";
        semaforo = false;
    }
    else{
        document.querySelectorAll(".menu")[0].style.color="#000";
        semaforo = true;
    }
    enlacesMenu.classList.toggle("menudos")
})

function mostrarMenu(){
    const menu = document.querySelector('.menu-perfil')
    menu.classList.toggle('mostrar-menu')
}


document.getElementById('fecha').textContent='Lunes';
const fecha = new Date();
const hoy = fecha.getDay();

switch(hoy){
    case 1:
        document.getElementById('fecha').textContent='Lunes';
        console.log(hoy)
        break;

    case 2:
            document.getElementById('fecha').textContent='Martes';
            console.log(hoy)
            break;

    case 3:
        document.getElementById('fecha').textContent='Miercoles';
        console.log(hoy)
        break;

    case 4:
        document.getElementById('fecha').textContent='Jueves';
        console.log(hoy)
        break;
    
    case 5:
        document.getElementById('fecha').textContent='Viernes';
        console.log(hoy)
        break;
    
    case 6:
        document.getElementById('fecha').textContent='Sabado';
        console.log(hoy)
        break;
    
    case 7:
        document.getElementById('fecha').textContent='Domingo';
        console.log(hoy)
        break;
    
}


