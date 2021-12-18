let navControl = document.querySelector(".hamburger");
let smallNav = document.querySelector(".navlinks-smallscreen");

navControl.addEventListener("click",()=>{
  toggleNav();
})

function toggleNav(){
  navControl.classList.toggle("cross");
  smallNav.classList.toggle("nav-active");
}