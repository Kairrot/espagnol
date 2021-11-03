const slider        = document.querySelector('.slider');
const elements      = document.querySelectorAll('.elements .item');
const slide         = document.querySelector('.slide')
const iconScroll    = document.querySelector('.icon-scroll');
const reserv        = document.querySelector('.reserv');

/* GERER MASQUE */
const sliderWidth = slider.offsetWidth
const sliderRange = Math.round(sliderWidth / 75)

const slideWidth = 150;
const elementsWidth = 200;

var slidePos = 0;

var isReserv = false;

document.body.addEventListener('wheel', e => {
    const futurePos = Math.sign(-e.wheelDeltaY) * sliderRange;
    slidePos += futurePos

    if(slidePos < 0 || (slidePos + slideWidth) > sliderWidth) {
        if((slidePos + slideWidth) > sliderWidth) {
            slide.style.left = '0px'
            slidePos = 0;
            document.body.style.background = ""

            reserv.style.transform = "translateY(0) scale(1)"
            isReserv = true;
        } else {
            slidePos -= futurePos;
        }
    } else {
        slide.style.left = slidePos.toString() + 'px'
    }

    var isInView = false;
    var i = 0;
    for(var el of elements) {
        const x = el.getBoundingClientRect().x - slider.getBoundingClientRect().x

        const left = slidePos - x;
        el.style.clipPath = `polygon(
            ${left}px 0,
            ${left + slideWidth}px 0,
            ${left + slideWidth}px 100%,
            ${left}px 100%
        )`

        if(left >= 0 && slidePos + slideWidth <= x + elementsWidth) {
            showCentral(el.dataset.content)
            isInView = true

            if(i == elements.length - 1) {
                setTimeout(() => {
                    document.querySelector('.row-wrap').style.opacity = "1"
                }, 2000)
            }
        }

        i++
    }

    if(!isInView) showCentral()
})

const showCentral = (show) => {
    const list = ['start', 'dali', 'sagrada', 'guel', 'montserrat']

    for(var e of list) {
        document.querySelector('.' + e).style.display = 'none';
    }

    if(show) {
        document.querySelector('.' + show).style.display = "flex";
        document.body.style.background = document.querySelector('.' + show).dataset.color
    }
}

/* ICON SCROLL */
var isScroll = false;
setTimeout(() => {
    if(!isScroll) {
        iconScroll.style.opacity = "1";
    }
},2000)

document.body.addEventListener('wheel', e => {
    isScroll = true
    iconScroll.style.opacity = "0";
})