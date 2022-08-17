const inputs = document.querySelectorAll(".campo-entrada");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");
//Para ir mostrando las ventanas de datos de registro
const toggle2_btn = document.querySelectorAll(".btnUsuario");
const toggle3_btn = document.querySelectorAll(".btnUsuario2");
const toggle4_btn = document.querySelectorAll(".btnProfesional");
//Para validar
const clave1 = document.getElementById("clave1");
const clave2 = document.getElementById("clave2");

inputs.forEach((inp) => {
  inp.addEventListener("focus", () => {
    inp.classList.add("active");
  });
  inp.addEventListener("blur", () => {
    if (inp.value != "") return;
    inp.classList.remove("active");
  });
});

/*----------Para el rol----------*/
toggle_btn.forEach((btn) => {
  btn.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode");
  });
});

/*--------Para mostrar la primera parte de registro de usuario----------*/
toggle2_btn.forEach((btn2) => {
  btn2.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode-usuario");
  });
});

/*--------Para mostrar la segunda parte de registro de usuario----------*/
toggle3_btn.forEach((btn3) => {
  btn3.addEventListener("click", () => {
    if(clave1.value==clave2.value){
      main.classList.toggle("sign-up-mode-usuario2");
    }
  });
});

/*-------Para mostrar los datos de registro para profesionales----------*/
toggle4_btn.forEach((btn4) => {
  btn4.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode-profesional");
  });
});


function moveSlider() {
  let index = this.dataset.value;

  let currentImage = document.querySelector(`.img-${index}`);
  images.forEach((img) => img.classList.remove("show"));
  currentImage.classList.add("show");

  const textSlider = document.querySelector(".text-group");
  textSlider.style.transform = `translateY(${-(index - 1) * 2.2}rem)`;

  bullets.forEach((bull) => bull.classList.remove("active"));
  this.classList.add("active");
}

bullets.forEach((bullet) => {
  bullet.addEventListener("click", moveSlider);
});

/*function mostrarFormUsuario(){
  document.getElementById('formulario-registro').style.display='';
  document.getElementById('preguntar-rol').style.display='none';
}*/

