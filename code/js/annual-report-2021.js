// home page cover scroll madness

let firstTitle = document.getElementById('first-title');
let knockout = document.getElementById('knockout');
let body = document.body;

let knockoutPosTop;
let verticalBgSlider;
const origPos = knockout.getBoundingClientRect().top;
let vh = window.innerHeight;
let vw = window.innerWidth;

let bgOffsetY = 400; //background-position-y whole value
let bgOffsetMakeUp = 140; //moves the bg image low enough to line up correctly with cutout

//test viewport aspect ratio
let vpAspect = function () {
    let viewportHeight = window.innerHeight;
    let viewportWidth = window.innerWidth;
    let aspect = (viewportHeight / viewportWidth);
    return aspect < 0.68;
};

window.addEventListener('load', function(e) {
    //sets bg image position based on aspect ratio to eliminate whitespace issue created by -px positioning
    if (vpAspect()) {
        body.style.backgroundPositionY = -bgOffsetY + 'px';
        //then slides bg image down to meet cutout if position -px
        window.addEventListener('scroll', function(e) {
            knockoutPosTop = knockout.getBoundingClientRect().top; //distance knockout image from window top
            //once the knockout crosses threshold the distance from top is used to pull the bg image down to meet the knockout
            if (knockoutPosTop <= bgOffsetY && knockoutPosTop > 0) {
                //within the conditional range the distance from knockout to top is used
                verticalBgSlider = knockoutPosTop;
                //the make up value is divided by the knockout position to add scaled values to smoothly get to the make up value position 0 + bgOffsetMakeUp
                body.style.backgroundPositionY = -(verticalBgSlider) + (bgOffsetMakeUp/verticalBgSlider) + 'px';
            } else if (window.pageYOffset > vh || knockoutPosTop === 0) {
                //this freezes the bg image movement if the knockout has reached the top
                body.style.backgroundPositionY = bgOffsetMakeUp + 'px';
            }
        })
    } else {
        body.style.backgroundPositionY = '0';
    }
})

window.addEventListener('resize', function(e) {
    if (vpAspect()) {
        body.style.backgroundPositionY = -bgOffsetY + 'px';
        window.addEventListener('scroll', function(e) {
            knockoutPosTop = knockout.getBoundingClientRect().top;
            if (knockoutPosTop <= bgOffsetY && knockoutPosTop > 0) {
                verticalBgSlider = knockoutPosTop;
                body.style.backgroundPositionY = -(verticalBgSlider) + (bgOffsetMakeUp/verticalBgSlider) + 'px';
            } else if (window.pageYOffset > vh || knockoutPosTop === 0) {
                body.style.backgroundPositionY = bgOffsetMakeUp + 'px';
            }
        })
    } else {
        body.style.backgroundPositionY = '0';
    }
    animateFirstTitle();
})

window.addEventListener('scroll', animateFirstTitle);

function animateFirstTitle(event) {
    knockoutPosTop = knockout.getBoundingClientRect().top; //distance knockout image from window top
    //show/hide first-title
    if (knockoutPosTop <= 0) {
        firstTitle.classList.add('animate-up');
        knockout.classList.add('freeze-knockout');
    } else if (knockoutPosTop > 0 && knockout.classList.contains('freeze-knockout')) {
        knockout.classList.remove('freeze-knockout');
    } else if (knockoutPosTop >= origPos) {
        firstTitle.classList.remove('animate-up');
    }
}

