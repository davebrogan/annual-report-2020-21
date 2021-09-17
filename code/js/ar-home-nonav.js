// home page cover scroll madness

let firstTitle = document.getElementById('first-title');
let knockout = document.getElementById('knockout');
let body = document.body;
let pageBody = document.getElementsByClassName('showcase-html-section')[0];
let bannerWrap = document.getElementsByClassName('banner-wrap')[0];

let knockoutPosTop;
let verticalBgSlider;
const origPos = knockout.getBoundingClientRect().top;
console.log('original position is ' + origPos);
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
    console.log('knockout pos is ' + knockoutPosTop);
    if (vpAspect()) {
        body.style.backgroundPositionY = -bgOffsetY + 'px';
        console.log('aspect is true');
        //then slides bg image down to meet cutout if position -px
        window.addEventListener('scroll', function(e) {
            knockoutPosTop = knockout.getBoundingClientRect().top; //distance knockout image from window top
            console.log('knockout pos is ' + knockoutPosTop);
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
        bannerWrap.style.backgroundPositionY = '0';
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
})

window.addEventListener('scroll', function() {
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
})

//hide div until clarendon loads
//this method of loading custom fonts was tested against others including some native browser behavior, css inline code, etc, with inconclusive results.
//this method relies on traditional @font-face techniques for implementing custom fonts. See the custom-type-starter.scss file.

/*document.fonts.ready.then(function () {
    var titleContent = document.getElementById('hide-title-load');
    titleContent.style.visibility = "visible";
});

document.fonts.ready.then(function() {
    var statContent = document.getElementById('hide-clar-load');
    console.log(statContent);
    statContent.style.visibility = "visible";
});*/

