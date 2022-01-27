const a = document.getElementsByClassName('name')[0].innerHTML
let names = "";
let i = 1;
let turn = false;

setInterval(function(){
    if(i < a.length && turn == false)
{
    document.getElementsByClassName('name')[0].innerHTML = a.substring(0, i) + "|"
    i++
    }else if(i > 1 && turn == true)
    {
      document.getElementsByClassName('name')[0].innerHTML = a.substring(0, i) + "|"
      i--
    }
    else
    {

    if(turn){
       turn = false;
         }else{
        turn=true;
       }
    }


},200);

// get buger knop
const burger = document.querySelector(".burger");
// get navmenu
const navMenu = document.querySelector(
  ".nav-menu"
);

// get navMenuItems
const navMenuItems = document.querySelectorAll(
  ".nav-menu li"
);

burger.addEventListener("click", () => {
  // burger knop
  burger.classList.toggle("active");
  // navMenu open
  navMenu.classList.toggle("open");

  // animatie
  navMenuItems.forEach((item, index) => {
    // als animatie is toegevoegd,zal annuleren...
    if (item.style.animation) {
      item.style.animation = "";
    } else {
      item.style.animation = `0.3s ease-in slideIn forwards ${index *
        0.1 +
        0.3}s`;
    }
  });
});
// background start
! function(){
  var canvas = document.createElement("canvas"),
    context = canvas.getContext("2d"),
    attr = getAttr();
    canvas.id = "c_n" + attr.length;
    canvas.style.cssText = "position:fixed;top:0;left:0;z-index:" + attr.z + ";opacity:" + attr.opacity;

    document.getElementsByTagName("body")[0].appendChild(canvas);
    getWindowWH();
    
    window.onresize = getWindowWH;
    function getAttr() {
      let scripts = document.getElementsByTagName("script"),
      len = scripts.length,
      script = scripts[len - 1]; //v is de laatste script element
      return {
          length: len,
          z: script.getAttribute("zIndex") || -1,
          opacity: script.getAttribute("opacity") || 0.5,
          color: script.getAttribute("color") || "0,0,0",
          count: script.getAttribute("count") || 99
      }
}
function getWindowWH() {
  W = canvas.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  H = canvas.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}
var random = Math.random,
squares = []; //bewaar kleine blokjes
for (let p = 0; p < attr.count; p++) {
    var square_x = random() * W,
    //abscis
    square_y = random() * H,
    //ordinaat
    square_xa = 2 * random() - 1, //x 
    square_ya = 2 * random() - 1; //y
    squares.push({
        x: square_x,
        y: square_y,
        xa: square_xa,
        ya: square_ya,
        max: 6000
    })
}
var mouse = {
    x: null,
    y: null,
    max: 20000
};
//positie van de muis blokjes
window.onmousemove = function(i) {
    i = i || window.event;
    mouse.x = i.clientX;
    mouse.y = i.clientY;
}
//verwijder kleine blokjes
window.onmouseout = function() {
    mouse.x = null;
    mouse.y = null;
}
// blockjes tekenen
var animation = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
function(i) {
    window.setTimeout(i, 1000 / 45)
}; 
function draw() {
    context.clearRect(0, 0, W, H);
    var w = [mouse].concat(squares);
    var x, v, A, B, z, y;
    //square：x，y，xa，ya，max
    squares.forEach(function(i) {
        //gerichte beweging in kleine blokken
        i.x += i.xa;
        i.y += i.ya;
        // controle richting
        // beweegt in de tegenovergestelde richting
        i.xa = i.xa * (i.x > W || i.x < 0 ? -1 : 1);
        i.ya = i.ya * (i.y > H || i.y < 0 ? -1 : 1);
        //fillRect de eerste twee parameters zijn x en y coordinaten, de laatste twee zijn breedte en hoogte
        //blokken tekenen
        context.fillRect(i.x - 0.5, i.y - 0.5, 1, 1);
        for (let n = 0; n < w.length; n++) {
            x = w[n];
            if (i !== x && null !== x.x && null !== x.y) {
                x_diff = i.x - x.x; //het x-coordinaatverschil tussen i en x
                y_diff = i.y - x.y; //het y-coordinaatverschil tussen i en y
                distance = x_diff * x_diff + y_diff * y_diff; 
                if (distance < x.max) {
                    if (x === mouse && distance > x.max / 2) {
                        i.x = i.x - 0.03 * x_diff;
                        i.y = i.y - 0.03 * y_diff;
                    }
                    A = (x.max - distance) / x.max;
                    context.beginPath();
                    context.lineWidth = A / 2;
                    context.strokeStyle = "rgba(" + attr.color + "," + (A + 0.2) + ")";
                    context.moveTo(i.x, i.y);
                    context.lineTo(x.x, x.y);
                    context.stroke();
                }
            }
        }
        //verwijder de i-blokken uit de w-array 
        //verkom dat twee kleine blokken met elkaar in verbinding staan 
        w.splice(w.indexOf(i), 1);
    });
    animation(draw);
}
setTimeout(function() {
    draw();
},
100)
} ();

//background end

