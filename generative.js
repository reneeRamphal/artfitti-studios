(() => {
//// global variables section

 
var canvas;
var ctx;
var cw = 1000;
var ch = 700;

var c1 = {
    x: cw/2,
    y: ch/2,
    r: 50,
    c: 260,
    a: 0.75,
    change:{x: 0, y: 0, r: 0, c: 0, a: 0}
}
var state = false;
var allShapes = [];
var interval;
var positions = createDataFillScreen();
var rect1 = {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
    random: 0,
    c: 0,
    a: 0.75,
    change:{x: 4, y: 4, w: 0, h: 0, c: 0, a: 0}
};

var allRects = [];
var rectPositions = createRectDataFillScreen();
var allStars = [];
var centerCircle = {
    x: cw / 2,
    y: ch / 2,
    r: 0,
    c: 0,      
    a: 1,
    change:{
        x: 0,
        y: 0,
        r: 2,   // grows outward
        c: 0,
        a: 0
    }
};

var finalCircle = {
    x: cw / 2,
    y: ch / 2,
    r: 8,
    c: 210,   // light blue
    a: 1,
    change: {x: 0, y: 0, r: 0, c: 0, a: 0}
};










setUpCanvas();



animationLoop();

//////////////////////// setTimeouts here
///// paused screen
setTimeout(function(){

    interval = setInterval(function(){
        var rn = randi(positions.length);
        var e = positions[rn];
        positions.splice(rn, 1);
        allShapes.push(e);

        if(positions.length <= 0){
            clearInterval(interval);
        }

    }, 10);

}, 3000);     //// blank for 3 secs

setTimeout(function(){  

    for(var i = 0; i < allShapes.length; i++){
        allShapes[i].change.r = 0.5;
    }

}, 5000);

setTimeout(function(){

    for(var i = 0; i < allShapes.length; i++){
        allShapes[i].change.r = 0;
    }

}, 8000);    ///// grow and stop

setTimeout(function(){

    var rectInterval = setInterval(function(){

        var rn = randi(rectPositions.length);
        var e = rectPositions[rn];

        rectPositions.splice(rn, 1);
        allRects.push(e);

        if(rectPositions.length <= 0){
            clearInterval(rectInterval);
        }

    }, 30); // speed of appearance

}, 8000);    ///// ends screen with squares

setTimeout(function(){

    allStars = createStarData();
    console.log("stars growing");

}, 12000);   ///// adds custom shape after 12 secs

setTimeout(function(){

    console.log(" center circle appears");

    state = true;

}, 25000);   /// returns canvas to red screen














///// circle animation

function animationLoop(){
    
        clear();
        if(state){
            circle(c1);
            updateProperties_circle(c1);
            wrap(c1);
        }
        
        
    for(var i = 0; i < allShapes.length; i++){
        circle(allShapes[i]);
        updateProperties_circle(allShapes[i]);
        wrap(allShapes[i]);
    
    }
    
    for(var i = 0; i < allRects.length; i++){
        rect(allRects[i]);
        updateProperties_rect(allRects[i]);
        wrap(allRects[i]);
    }

    for(var i = 0; i < allStars.length; i++){
        star(allStars[i]);
        updateProperties_star(allStars[i]);
    }

    if(state){
        circle(centerCircle);
        updateProperties_circle(centerCircle);
    }

   if(state){
        circle(finalCircle);
        wrap(finalCircle);
    }
    

    
    requestAnimationFrame(animationLoop);



  
}









/////// functions section
function updateProperties_star(o){
    o.x += o.change.x;
    o.y += o.change.y;
    o.size += o.change.size;
    o.c += o.change.c;
    o.a += o.change.a;
}

function createStarData(){
    var a = [];

    for(var i = 0; i < 20; i++){

        a.push({
            x: ran(cw),
            y: ran(ch),
            size: 20,
            c: 180,
            a: 1,
            change:{
                x: 0,
                y: 0,
                size: 0.2,
                c: 0,
                a: 0
            }
        });

    }

    return a;
}

function star(o){

    var x = o.x;
    var y = o.y;
    var size = o.size;

    ctx.fillStyle = "rgba(255, 25, 0, 0.58)";

    ctx.beginPath();

    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size/2, y + size/2);
    ctx.lineTo(x + size, y + size/2);
    ctx.lineTo(x + size/2, y + size);
    ctx.lineTo(x, y + size/1.5);
    ctx.lineTo(x - size/2, y + size);
    ctx.lineTo(x - size, y + size/2);
    ctx.lineTo(x - size/2, y + size/2);

    ctx.closePath();
    ctx.fill();
}

function star_previous (x, y, size){
    ctx.fillStyle = "rgba(0, 247, 255, 0.58)";
    ctx.beginPath();
    ctx.moveTo(x, y - size);       //// top point
    ctx.lineTo(x + size/2, y + size/2);  /// right point
    ctx.lineTo(x + size, y + size/2);
    ctx.lineTo(x + size/2, y + size);
    ctx.lineTo(x, y + size/1.5);
    ctx.lineTo(x - size/2, y + size);
    ctx.lineTo(x - size, y + size/2);
    ctx.lineTo(x-size/2, y + size/2);

    ctx.closePath();

    ctx.fill();
}

function createRectDataFillScreen(){
    var a = [];
    var x = 50;
    var y = 50;

    for(var i = 0; i < 100; i++){

        a.push({
            x: x,
            y: y,
            w: 50,
            h: 50,
            random: 0,
            c: 255,
            a: 1,
            change:{
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                r: 0,
                c: 0,
                a: 0
            }
        });

        x += 100;

        if(x > cw){
            x = 50;
            y += 100;
        }

        if(y > ch){
            break;
        }
    }

    return a;
}

function createDataFillScreen(){
    var a = [];
    var x = 0;
    var y = 0;

    for(var i=0; i<100; i++){  

        a.push({    
            x: x,
            y: y,
            r: 70,
            c: 0,
            a: 0.75,
            change:{
                x: 0, 
                y: 0, 
                r: 0, 
                c: 0, 
                a: 0
            }
        })
        x += 100;
        if(x>cw){
            x = 0;
            y += 100;
        } 
        if(y > ch){
        break
        }
    }
    return a
}

function updateProperties_rect(o){
    o.x += o.change.x;
    o.y += o.change.y;
    o.w += o.change.w;
    o.h += o.change.h;
    o.c += o.change.c;
    o.a += o.change.a;
}

function updateProperties_circle_continualRandom(o){
    o.x += o.change.x;
    o.y += o.change.y;
    o.r += o.change.r;
    o.c += o.change.c;
    o.a += o.change.a;
    o.change.x += ran (-1, 1);
    o.change.y += ran (-1, 1);
////// caps the naximum speed
    if (o.change.x > 10){
        o.change.x = 10;
    }else if(o.change.x < -10){
        o.change.x = -10;
    }else if(o.change.y > 10){
        o.change.y = 10
    }else if(o.change.y < -10){
        o.change.y = -10;
    }
}


function updateProperties_circle(o){
    o.x += o.change.x;
    o.y += o.change.y;
    o.r += o.change.r;   /// radius changes here
    o.c += o.change.c;
    o.a += o.change.a;
}

function createData(num){
    var a = [];
    for(var i=0; i<num; i++){
        a.push({
        x: ranRange(100,900),
        y: ch/2,
        r: 50,
        c: 260,
        a: 0.75,
        change: {
            x: ranRange(-10, 10), 
            y: ranRange(-10, 10), 
            r: 0, 
            c:0, 
            a:0},
        })
    }
    return a
}

function bounce(o){

    if(o.x > cw){
        o.x = cw;
        o.change.x *= -1;
    }else if(o.x < 0){
        o.x = 0;
        o.change.x *= -1;
    }else if(o.y > ch){
        o.y = ch;
        o.change.y *= -1
    }else if (o.y < 0){
        o.y = 0;
        o.change.y *= -1;
    }


   


    // if(o.x > cw || o.x < 0){
    //     o.change.x *= -1;
    // }else if(o.y > ch || o.y < 0){
    //     o.change.y *= -1
    // }

}

function wrap(o){
    if(o.x > cw){
        o.x = 0
    }else if (o.x < 0){
        o.x = cw;
    }else if(o.y > ch){
        o.y = 0;
    }else if(o.y < 0){
        o.y = ch;
    }

}


function clear(){
    ctx.fillStyle = "rgb(38, 0, 255)";
    ctx.fillRect(0,0,cw,ch);
}


function circle(o){
    var oneDegree = 2*Math.PI/360; 
    var dx;
    var dy;
    var steps = 100;      
    ctx.beginPath();

    // var angle = 0
    for(var i=0; i<=steps; i++){
        angle = i*(360/steps)          ///// += and 361 also closes off circle
        dx = o.r*Math.cos(angle*oneDegree);
        dy = o.r*Math.sin(angle*oneDegree);
        ctx.lineTo(o.x + dx, o.y + dy);

    }
    // ctx.closePath();   //// to fill in little space at end of circle 
    ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
    ctx.fill();

}

function rect(o){
    var x = o.x;
    var y = o.y;
    o.x = o.x - o.w/2;
    o.y = o.y - o.h/2;
    ctx.beginPath();
    ctx.moveTo(o.x + ran(o.random), o.y+ran(o.random));
    ctx.lineTo(o.x + o.w + ran(o.random), o.y+ran(o.random));
    ctx.lineTo(o.x + o.w + ran(o.random), o.y+o.h+ran(o.random));
    ctx.lineTo(o.x + ran(o.random), o.y+ o.h+ran(o.random));
    //ctx.closePath();
  //  ctx.strokeStyle = "hsla(" +String(c) + ", 100%, 50%, 1)";
    ctx.fillStyle = "hsla("+o.c+", 100%, 50%, "+o.a+")";
    ctx.fill();

    o.x = x;
    o.y = y;
}

function randi(range){
    var rn = Math.floor(ran(range));
    return rn
}

function ran(range){
    var randomNumber = Math.random() * range;
    return randomNumber;
}

function setUpCanvas(){
    canvas = document.getElementById("generativeCanvas");
    ctx = canvas.getContext("2d");
    canvas.style.border = "1.5px dotted black";
    canvas.width = cw;
    canvas.height = ch;
    ctx.fillStyle = "rgb(255, 0, 0)";
    ctx.fillRect(0, 0, cw, ch);

    }
})();
