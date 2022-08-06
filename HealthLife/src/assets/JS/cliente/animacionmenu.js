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




