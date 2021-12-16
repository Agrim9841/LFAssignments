let navControl = document.querySelector(".hamburger");
let smallNav = document.querySelector(".navlinks-smallscreen");

navControl.addEventListener("click",()=>{
  navControl.classList.toggle("cross");
  smallNav.classList.toggle("nav-active");
})