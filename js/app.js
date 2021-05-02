const canvas = document.getElementById("jsCanvas"),
    ctx = canvas.getContext("2d"),
    colors = Array.from(document.getElementsByClassName("jsColor")),
    range = document.getElementById("jsRange"),
    mode = document.getElementById("jsMode"),
    saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const INITIAL_LINE_WIDTH = 10;

const scaleX = canvas.width / canvas.offsetWidth;
const scaleY = canvas.height / canvas.offsetHeight;

// initializing background of canvas
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// initializing 2d context of canvas
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = INITIAL_LINE_WIDTH;

let painting = false,
    filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX * scaleX,
        y = (event.offsetY + 24) * scaleY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke()
    }
}

function canvasClick(event) {
    // only allow left mouse click
    if (event.which === 1) {
        startPainting();
        if (filling) {
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
}

function changeColor(event) {
    Array.from(event.target.parentNode.childNodes).forEach(node => {
        if (node.classList) {
            node.classList.remove("controls__color__now");
        }
    });
    event.target.classList.add("controls__color__now");
    const targetColor = event.target.style.backgroundColor;
    ctx.strokeStyle = targetColor;
    ctx.fillStyle = targetColor;
}

function changeMode() {
    if (filling) {
        canvas.style.cursor = 'url("./images/brush.png"), auto';
        filling = false;
        mode.innerText = "fill";
    } else {
        canvas.style.cursor = 'url("./images/bucket.png"), auto';
        filling = true;
        mode.innerText = "paint";
    }
}

function showSaveMenu() {
    const image = canvas.toDataURL();
    let tempLink = document.createElement("a");
    tempLink.href = image;
    tempLink.download = "PaintJS";
    tempLink.click();
    tempLink = null;
}

function init() {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", canvasClick);
    document.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseenter", event => ctx.moveTo(event.offsetX * scaleX, (event.offsetY + 24) * scaleY));
    canvas.addEventListener("contextmenu", event => event.preventDefault());
    colors.forEach(color => color.addEventListener("click", changeColor));
    range.addEventListener("input", event => ctx.lineWidth = event.target.value);
    mode.addEventListener("click", changeMode);
    saveBtn.addEventListener("click", showSaveMenu);
}

init();