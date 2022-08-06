const inputs = document.querySelectorAll(".campo-entrada");
const toggle_btn = document.querySelectorAll(".toggle");
const toggle2_btn = document.querySelectorAll(".btnUsuario");
const toggle3_btn = document.querySelectorAll(".btnProfesional");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");

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

/*--------Para los botones de rol----------*/
toggle2_btn.forEach((btn2) => {
  btn2.addEventListener("click", () => {
    main.classList.toggle("sign-up-mode-usuario");
  });
});

toggle3_btn.forEach((btn3) => {
  btn3.addEventListener("click", () => {
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
