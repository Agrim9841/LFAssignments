// Should have functional controls like forward and back arrows and indicator dots.
// Should have sliding animation when transitioning from one image to another.
// When reaching a boundary, the slider should either change direction or animate towards 
// the other boundary and continue in the same direction.
// Indicator dots should be clickable and transition to the image indicated when clicked.

const TOTAL_DISTANCE = 100;     // total diistance to be covered in percentage
const FRAME_REFRESH_RATE = 5;  // frame refresh rate in milli second
const TIME = 100;              // total time taken to reach destination in millisecond
const DISTANCE_COVERED_PER_REFRESH = TOTAL_DISTANCE/(TIME/FRAME_REFRESH_RATE);

var carauselList = document.querySelectorAll(".carousel-container");

function Carausel(carauselElement){
    this.element = carauselElement;
    this.element.style.height = this.element.getAttribute("height") + "px";
    this.imageList = this.element.querySelectorAll(".carausel-image");
    this.currentImage = 0;
    this.animating = false;

    let indicatorList = document.createElement("div");
    indicatorList.setAttribute("class", "carausel-indicator-list");

    for(let i = 0; i < this.imageList.length; i++){
        let indicator = document.createElement("span");
        if(i === this.currentImage){
            this.imageList[i].style.left = "0%";
            indicator.setAttribute("class", "carausel-indicator active-img");
        }else{
            this.imageList[i].style.left = "-100%";
            indicator.setAttribute("class", "carausel-indicator");
        }
        indicator.setAttribute("data-point-to", i);
        indicator.addEventListener("click", function(){
            if(i < this.currentImage){
                this.slideRight(i);
            }else if(i > this.currentImage){
                this.slideLeft(i);
            }
        }.bind(this));
        indicatorList.appendChild(indicator);
    }

    this.slideLeft=(nextIndex)=>{
        if(this.animating === false){
            this.animating = true;
            let nextImage = nextIndex;
            if(nextImage == undefined){
                if(this.currentImage-1 < 0){
                    nextImage = this.imageList.length - 1;
                }else{
                    nextImage = this.currentImage - 1;
                }
            }
            let left = 0;
            let slide = setInterval(() => {
                if(left <= -100){
                    indicatorList.children[this.currentImage].classList.remove("active-img");
                    indicatorList.children[nextImage].classList.add("active-img");
                    this.currentImage = nextImage;
                    this.animating = false;
                    clearInterval(slide);
                }else{
                    left-=DISTANCE_COVERED_PER_REFRESH;
                    this.imageList[this.currentImage].style.left = `${left}%`;
                    this.imageList[nextImage].style.left = `${left+100}%`;
                }
            }, FRAME_REFRESH_RATE);
        }
    }

    this.slideRight=(nextIndex)=>{
        if(this.animating === false){
            this.animating = true;
            let nextImage = nextIndex;
            if(nextImage == undefined){
                if(this.currentImage+1 >= this.imageList.length){
                    nextImage = 0;
                }else{
                    nextImage = this.currentImage + 1;
                }
            }
            let left = 0;
            let slide = setInterval(() => {
                if(left >= 100){
                    indicatorList.children[this.currentImage].classList.remove("active-img");
                    indicatorList.children[nextImage].classList.add("active-img");
                    this.currentImage = nextImage;
                    this.animating = false;
                    clearInterval(slide);
                }else{
                    left+=DISTANCE_COVERED_PER_REFRESH;
                    this.imageList[this.currentImage].style.left = `${left}%`;
                    this.imageList[nextImage].style.left = `${left-100}%`;
                }
            }, FRAME_REFRESH_RATE);
        }
    }

    let leftCtrlBtn = document.createElement("div");
    leftCtrlBtn.innerHTML = `<i class="fa fa-angle-left"></i>`;
    leftCtrlBtn.setAttribute("class", "carausel-control-left");
    leftCtrlBtn.addEventListener("click", function(){
        this.slideLeft();
    }.bind(this));

    let rightCtrlBtn = document.createElement("div");
    rightCtrlBtn.innerHTML = `<i class="fa fa-angle-right"></i>`;
    rightCtrlBtn.setAttribute("class", "carausel-control-right");
    rightCtrlBtn.addEventListener("click", function(){
        this.slideRight();
    }.bind(this));

    this.element.appendChild(indicatorList);
    this.element.appendChild(leftCtrlBtn);
    this.element.appendChild(rightCtrlBtn);

    

    // setInterval(() => {
    //     // console.log("hello");
    // }, 5000);
}

let car = new Carausel(carauselList[0]);
let car2 = new Carausel(carauselList[1]);