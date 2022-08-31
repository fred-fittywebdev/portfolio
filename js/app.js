let minimap = document.createElement('div');
let minimapSize = document.createElement('div');
let viewer = document.createElement('div');
let minimapContent = document.createElement('iframe');
let scale = 0.1;
let realScale;

minimap.className = 'minimap__container';
minimapSize.className = 'minimap__size';
viewer.className = 'minimap__viewer';
minimapContent.className = 'minimap__content';

minimap.append(minimapSize, viewer, minimapContent);
document.body.appendChild(minimap);

// We grab the html source to display in minimap, but we don't want the script tags.
let html = document.documentElement.outerHTML.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')

let iframeDoc = minimapContent.contentWindow.document;

// Send our html in our iframe
iframeDoc.open();
iframeDoc.write(html);
iframeDoc.close()

function getDimensions() {
    let bodyWidth = document.body.clientWidth;
    let bodyRatio = document.body.clientWidth / bodyWidth; // Give us the aspect ration of the body
    let winRatio = window.innerHeight / window.innerWidth;

    minimap.style.width = '15%';

    realScale = minimap.clientWidth / bodyWidth;

    minimapSize.style.paddingTop = `${bodyRatio * 100}%`;
    viewer.style.paddingTop = `${winRatio * 100}%`;

    minimapContent.style.transform = `scale(${realScale})`;
    minimapContent.style.width = `${(100 / realScale)}%`
    minimapContent.style.height = `${(100 / realScale)}%`
};

function trackScroll() {
    viewer.style.transform = `translateY(${window.scrollY * realScale}px)`;
}

function onResize() {
    if (window.matchMedia("(max-width: 1024px)").matches) {
        minimap.style.display = "none";
    } else {
        minimap.style.display = "block";
    }
}


getDimensions()
window.addEventListener('scroll', trackScroll);
window.addEventListener('resize', onResize);


let innerCursor = document.querySelector('.inner--cursor');
let outerCursor = document.querySelector('.outer--cursor');

document.addEventListener('mousemove', moveCursor)

function moveCursor(e) {
    let x = e.clientX
    let y = e.clientY

    innerCursor.style.left = `${x}px`
    innerCursor.style.top = `${y}px`
    outerCursor.style.left = `${x}px`
    outerCursor.style.top = `${y}px`
}

let links = Array.from(document.querySelectorAll("a"))
links.forEach((link) => {
    link.addEventListener('mouseover', () => {
        innerCursor.classList.add("grow")
    })
    link.addEventListener('mouseleave', () => {
        innerCursor.classList.remove("grow")
    })
})

const play = document.getElementById("music-play")
const pause = document.getElementById("music-pause")

const music = new Audio('hip-hop.mp3')

play.addEventListener('click', () => {
    music.play()
    music.volume = 0.2
    pause.style.display = "flex"
    play.style.display = "none"
})


pause.addEventListener('click', () => {
    music.volume = 0
    pause.style.display = "none"
    play.style.display = "flex"
})
