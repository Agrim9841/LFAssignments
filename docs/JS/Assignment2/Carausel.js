// Transition and hold times should be configurable
// Should automatically slide from one image to another with a fixed interval.
// The page should allow multiple instances of the slider.
// Should be responsive.
// OOP using ES5 // optional // not really necessary // ES6 classes are allowed


const TOTAL_DISTANCE = 100;     // total diistance to be covered in percentage
const FRAME_REFRESH_RATE = 10;  // frame refresh rate in milli second

var carauselList = document.querySelectorAll(".carousel-container");

function Carausel(carauselElement, holdTime = 5000, transitionTime = 100){
    this.element = carauselElement;
    this.imageList = this.element.querySelectorAll(".carausel-image");
    this.currentImage = 0;
    this.animating = false;
    this.distanceCoveredPerRefresh = ((TOTAL_DISTANCE* FRAME_REFRESH_RATE)/(transitionTime));

    let height = this.element.getAttribute("height");
    if(height){
        this.element.style.height = this.element.getAttribute("height") + "px";
    }

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
                    left-=this.distanceCoveredPerRefresh;
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
                    left+=this.distanceCoveredPerRefresh;
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

    setInterval(() => {
        this.slideRight();
    }, holdTime);
}

carauselList.forEach(car => {
    let holdTime = car.getAttribute("data-hold-time");
    let transitionTime = car.getAttribute("data-transition-time");
    if(!holdTime){
        holdTime = 5000;
    }
    if(!transitionTime){
        transitionTime = 100;
    }
    new Carausel(car, holdTime, transitionTime);
});
