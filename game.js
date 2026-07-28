(() => {
//// global variables section

 
var canvas;
var ctx;
var cw = 1000;
var ch = 700;

var c1 = {
    x: cw/2,
    y: ch/2,
    r: 10,
    s: 10,
    c: 260,
    a: 0.8,
    random: 0,
    change: {x: ran(-5, 5), y:ran(-5, 5), w:0, h:0, c:0, a:0, random: 0}
}

var shapes = [];
var timer;
var timeLeft = 15;
var countdown;
var gameOver = false;
var mouse = {
    x: cw/2,
    y: ch/2
}
var grid = [];
var gridIndex = 0;
var score = 0;
var targetScore = 20;
var gameResult = "";


document.getElementById("gameCanvas").onclick = click;
document.getElementById("gameCanvas").onmousemove = move;
document.onkeydown = keyDown;

















/////// function CALL section

setUpCanvas();
createGrid();
timer = setInterval(addCircle, 50);
countdown = setInterval(updateTimer, 1000);
animationLoop();



















function animationLoop(){
    clear();

    for (var i = 0; i < shapes.length; i++){
        circle(shapes[i]);

        if(!gameOver){
            if(shapes[i].a > 0){
                shapes[i].a += 0.005;
            }
            updateProperties(shapes[i]);
            bounce(shapes[i]);
        }
    }

    textTimer();
    textInstructions();
    textScore();
    textGameOver();

    requestAnimationFrame(animationLoop);
}
function burst(circle){

    for(var i=0; i<8; i++){

        shapes.push({

            x: circle.x,
            y: circle.y,

            r: ran(8)+3,

            c: ran(360),

            a: 1,

            change:{
                x: ran(10)-5,
                y: ran(10)-5,
                r:0,
                c:0,
                a:-0.02
            }

        });

    }

}





/////// functions section
function textGameOver(){

    if(!gameOver) return;

    ctx.fillStyle = "white";
    ctx.font = "70px Arial";
    ctx.textAlign = "center";

    ctx.fillText(gameResult, cw/2, ch/2);

    ctx.font = "30px Arial";
    ctx.fillText("Final Score: " + score, cw/2, ch/2 + 60);

}
function textScore(){

    ctx.fillStyle = "white";
    ctx.font = "28px Arial";
    ctx.textAlign = "left";

    ctx.fillText("Score: " + score,20,40);

}
function click(event){

    if(gameOver) return;

    for(var i = shapes.length-1; i >= 0; i--){

        var dx = event.offsetX - shapes[i].x;
        var dy = event.offsetY - shapes[i].y;
        var distance = Math.sqrt(dx*dx + dy*dy);

        if(distance < shapes[i].r){

            burst(shapes[i]);

            shapes.splice(i,1);

            score++;

            break;
        }
    }
}
function textInstructions(){
    ctx.fillStyle = "white";
    ctx.font = "18px Arial";
    ctx.textAlign = "right";

    ctx.fillText("R: Colour Change", cw - 20, 80);
    ctx.fillText("M: Change Locations", cw - 20, 105);
    ctx.fillText("C: Clear", cw - 20, 130);
}

function createGrid(){           //// spacing of circles

    var spacing = 80;

    for(var y = spacing/2; y < ch; y += spacing){

        for(var x = spacing/2; x < cw; x += spacing){

            grid.push({
                x: x,
                y: y
            });

        }

    }

}
function move(event){

    if(shapes.length > 0){

        var lastCircle = shapes[shapes.length - 1];

        if(lastCircle.growing){

            var dx = event.offsetX - lastCircle.x;
            var dy = event.offsetY - lastCircle.y;

            lastCircle.r = Math.sqrt(dx * dx + dy * dy);
        }
    }
}
function textTimer(){

    ctx.fillStyle = "white";
    ctx.font = "28px Arial";
    ctx.textAlign = "right";

    if(gameOver){
        ctx.fillText("Time's Up!", cw - 20, 40);
    }else{
        ctx.fillText("Time: " + timeLeft, cw - 20, 40);
    }

}

function updateTimer(){

    if(timeLeft > 0){
        timeLeft--;
    }else{

        clearInterval(timer);
        clearInterval(countdown);

        gameOver = true;

        if(score >= targetScore){
            gameResult = "YOU WIN!";
        }else{
            gameResult = "GAME OVER";
        }
    }
}
// function updateTimer(){

//     if(timeLeft > 0){
//         timeLeft--;
//     }else{
//         clearInterval(countdown);
//         clearInterval(timer);
//     if(score >= targetScore){

//         gameOver = true;

//         clearInterval(timer);
//         clearInterval(countdown);

// }

//         gameOver = true;

//         console.log("Time's up!");
//     }

// }

function updateTimer_old(){

    if(timeLeft > 0){
        timeLeft--;
    }else{
        clearInterval(countdown);

        // Optional: stop adding circles after 15 seconds
        clearInterval(timer);

        console.log("Time's up!");
    }

}
function counter(){
    var count = 0; 

    return {
        increment: increment,
        count: getCurrentCount
    }

    function increment(){
        count++
    }
    function getCurrentCount(){
        return count
    }

}
function text(t, x, y, align){
    ctx.beginPath(); 
    ctx.textAlign = align; 
    ctx.font = "50px Arial"; 
    ctx.fillStyle = "black"; 
    ctx.fillText(t,x,y ); 

}
function keyDown(event){
    event.preventDefault(); 
    if(event.key == "c"){

        shapes = [];
        console.log("clear");

    } 

    event.preventDefault();
    if(event.key == "r"){
     
        for(var i=0; i<shapes.length; i++){

            shapes[i].c = ran(360);
            console.log("random colour change")

        } 
    event.preventDefault(); 

    }if(event.key == "m"){
        for (var i=0; i < shapes.length; i++)    //////comes in on the right
            shapes[i].x = ran(cw);
            shapes[i].y = ran(ch);
            console.log("random X Y");        
    }   
            
}



function addCircle(){

    if(gridIndex >= grid.length){
        return;
    }

    var p = grid[gridIndex];

    shapes.push({

        x: p.x,
        y: p.y,
        r: 50,
        c: 0,
        a: 0.8,
        change:{
            x: ran(6)-3,
            y: ran(6)-3,
            r:0,
            c:0,
            a:0
        }

    })

    gridIndex++;

}
function collision_all_array(o, array){
    for (var i =0; i<array.length; i++){
        if(o != array[i]){
        collision_circle_remove(o, array[i], array);
        }
    }

}
function createDataCircle(num, array){
    for(var i=0; i<num; i++){
        array.push({    
            x: ran(cw),
            y: ran(ch),
            r: 50,
            s: 10,
            c: 0,
            a: 0.8,
            random: 0,
            change: {x: 0, y: 0, w:0, h:0, c:0, a:0, random: 0}
        })
    }
}
function collision_circle_remove(o1, o2, array){
    var dx = Math.abs (o1.x - o2.y);
    var dy = Math.abs (o1.x - o2.y);
    var dh = Math.sqrt(dx * dx + dy * dy);
    var index;
    if (dh < o1.r + o2.r){
        index + array.indexOf(o2);
        array.splice(index, 1);
    //     if(dx > dy){
    //         o1.change.x *= -1;
    //         o2.change.x *= -1;
    //     }else{
    //         o1.change.y *= -1;
    //         o2.change.y *= -1;
    //     }
    //     // console.log ("collision");
    //     // stop(o1, o2);

    }

}
function collision_circle(o1, o2){
    var dx = Math.abs (o1.x - o2.y);
    var dy = Math.abs (o1.y - o2.y);
    var dh = Math.sqrt(dx * dx + dy * dy);
    if (dh < o1.r + o2.r){
        if(dx > dy){
            o1.change.x *= -1;
            o2.change.x *= -1;
        }else{
            o1.change.y *= -1;
            o2.change.y *= -1;
        }
        // console.log ("collision");
        // stop(o1, o2);

    }

}
function collision_rect(o1,o2){
    var dx = Math.abs (o1.x - o2.x);
    var dy = Math.abs (o1.y - o2.y);
    // console.log(dx, dy);

    if(
        o1.x + o1.w/2 > o2.x - o2.w/2 &&   ///// right side of the o1 > left side of o2
        o1.x - o1.w/2 < o2.x + o2.w/2 && ///// left side of 01 < rightside of o2
        o1.y + o1.h/2 > o2.y - o2.h/2 &&   ///// bottom of o1 > top of o2
        o1.y - o1.h/2 < o2.y + o2.h/2      ///// top of o1 < bottom of o2
    ){   
        
        if (dx > dy){
            o1.change.x *= -1;
            o1.change.y *= -1;
       
        }else{    
       
            o2.change.y *= -1;
            o2.change.x *= -1;
    }    
        console.log("collision - potential");
        // stop(blue, red);

    }
}
function stop(o1, o2){
    o1.change.x = 0;
    o2.change.x = 0;
    o1.change.y = 0;
    o2.change.y = 0;
}
function createDataRectLocation(num, array, o){
    for(var i=0; i<num; i++){
    array.push({
        x: o.x,
        y: o.y,
        w: 25,
        h: 25,
        c: 260,
        a: 0.8,
        random: 0,
        change: {x: ran(-5, 5), y:ran(-5, 5), w: 0, c: 0, a: 0}
        })
    }
}
function click_old(event){
    console.log("click", event.offsetX, event.offsetY);
    s1.x = event.offsetX;
    s1.y = event.offsetY;
    // rect(s1);     ///// not doing anything perceptionally

}
// function click(event){

//     shapes.push({
//         x: event.offsetX,
//         y: event.offsetY,
//         r: 50,
//         w: 100,
//         h: 100,
//         s: 10,
//         c: 0,
//         a: 0.8,
//         growing: true,        ////// changed random to boolean - grows circles with cursor after click
//         change: { x: ran(-5), y: ran(-5), w: 0, h: 0, c: 0, a: 0, random: 0}
//     });

//     console.log("click");
// }
function up(){
    state.mousedown = false
    console.log("up");
}
function down (){
    state.mousedown = true;
    console.log("down");
}

function moveRect(event){
    var cursor = {
        x: event.offsetX, 
        y: event.offsetY
    }
        if (state.mousedown){
          createDataRect(1, shapes, cursor);  
    }
}
    function createDataRect(num, array, o){
    for(var i=0; i<num; i++){
        array.push({
            x: o.x,
            y: o.y,
            w: 25,
            h:25,
            c: 260,
            a: 0.8,
            random: 0,
            change: { x: 0, y: 0, w: 0, h: 0, c:0, a: 0}
        })
    }
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
function updateProperties(o){
    for(var keys in o.change){
        o[keys] += o.change[keys];
    }
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
    ctx.fillStyle = "rgb(30, 0, 255)";
    ctx.fillRect(0,0,cw,ch);
}
function shapeEx(o){
    var x = o.x;
    var y = o.y;
    o.x = o.x - o.s*8;
    o.y = o.y - o.s*10;
    ctx.beginPath();
    ctx.moveTo(o.x, o.y);
    ctx.lineTo(o.x + 5 * o.s, o.y + 7.5 * o.s);
    ctx.lineTo(o.x + 7 * o.s, o.y + 4 * o.s);
    ctx.lineTo(o.x + 10 * o.s, o.y + 9 * o.s);
    ctx.lineTo(o.x +13 * o.s , o.y + 4 * o.s);
    ctx.lineTo(o.x + 9 * o.s, o.y + 17 * o.s);
    ctx.closePath();
    ctx.stroke();
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
function randi(range){
    var rn = Math.floor(ran(range));
    return rn
}
function ran(range){
    var randomNumber = Math.random() * range;
    return randomNumber;
}
function setUpCanvas(){
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    canvas.style.border = "1.5px dotted black";
    canvas.width = cw;
    canvas.height = ch;
}

})();