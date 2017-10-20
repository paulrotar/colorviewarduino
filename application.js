var hexCodes;
var r, g, b;
var num = 0;
var n = num.toString();
var max_distance;
var idnumber = 2;
var secondidnumber;
var colorName;
var button;
var rgbCodes;
var date;
var url;
var secondurl;

function preload(){
            // Get the colors in the database
   url = 'https://api.mlab.com/api/1/databases/paulrotardb/collections/colorcatcheds?q={"_id":'+idnumber+'}&f={"__v":0}&fo=true&apiKey=LB-XNdkgi7CtjESs60AEZQLTP7PRAR1b';
  //url = 'https://api.mlab.com/api/1/databases/paulrotardb/collections/colorcatcheds?apiKey=LB-XNdkgi7CtjESs60AEZQLTP7PRAR1b';
  loadJSON(url,gotData);
    secondidnumber = idnumber + 1;
    secondurl = 'https://api.mlab.com/api/1/databases/paulrotardb/collections/colorcatcheds?q={"_id":'+secondidnumber+'}&f={"__v":0}&fo=true&apiKey=LB-XNdkgi7CtjESs60AEZQLTP7PRAR1b'
    loadJSON(secondurl,secondGotData);
    
}

function setup() {
    
    createCanvas(windowWidth, windowHeight);
    noStroke();
    max_distance = dist(0, 0, width, height);
}

function addInput(){
    document.getElementById('colorpicker').value = hexCodes.color;
}

function ifButtonNext(){
    idnumber = idnumber + 1;
    preload();
}
 
function ifButtonPrev(){
    idnumber = idnumber - 1;
    preload();
}

function mousePressed() {
    if ( mouseX > 1500 && mouseX < 1650 && mouseY > 527 && mouseY < 597 && secondHexCodes != null){
        ifButtonNext();
    }
    if ( mouseX > 274 && mouseX < 424 && mouseY > 527 && mouseY < 597 && idnumber > 2){
        ifButtonPrev();
    }
}

function draw() {
  background(200);
    if(hexCodes){
  ifCorrect();
    } 
    console.log(idnumber);
}

function gotData(data) {
    hexCodes = data;
}

function secondGotData(seconddata){
    secondHexCodes = seconddata;
}

function hexToRgb(hex) {
    r = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
        if (r) {
                return r.slice(1,4).map(function(x) { return parseInt(x, 16); });
        }
}

/* function rgbToHsv(r, g, b) {
    var
        min = Math.min(r, g, b),
        max = Math.max(r, g, b),
        delta = max - min,
        h, s, v = max;

    v = Math.floor(max / 255 * 100);
    if ( max != 0 )
        s = Math.floor(delta / max * 100);
    else {
        // black
        return [0, 0, 0];
    }

    if( r == max )
        h = ( g - b ) / delta;         // between yellow & magenta
    else if( g == max )
        h = 2 + ( b - r ) / delta;     // between cyan & yellow
    else
        h = 4 + ( r - g ) / delta;     // between magenta & cyan

    h = Math.floor(h * 60);            // degrees
    if( h < 0 ) h += 360;

    return [h, s, v];
} */

function ifCorrect() {
    // Get the magnitude and name of the earthquake out of the loaded JSON
  date = hexCodes.updatedAt.$date;
  colorName = hexCodes.color;
    if (secondHexCodes != null){
    secondColorName = secondHexCodes.color;
    } else if (secondHexCodes == null) {
        secondColorName = null;
    }
    drawImportant();
    addInput();
  /*  var coordX = mouseX;
    var coordY = mouseY;
    console.log(mouseX,mouseY);
    fill(255);
    rect(coordX,coordY,width,5);
    fill(255);
    rect(coordX,coordY,5,height);
    fill(255);
    textSize(30);
    text(coordX + " " + coordY,width/2,height/2);*/
}

// Custom method for updating the variables

// Custom method for drawing the object

function drawImportant(){
    if ( secondHexCodes != null ){
        if ( secondColorName == null){
            fill(100);
            rect(width/1.28, height/1.80,150,70);
        } else if ( secondColorName != null) {
    fill(secondColorName);
    rect(width/1.28, height/1.80,150,70);
    }
    fill(240);
    textSize(30);
    text("Next >",width/1.217,height/1.66);
    }
    if ( secondHexCodes == null ){
        fill(100);
    rect(width/1.28, height/1.80,150,70);
        fill(240);
    textSize(15);
    text("No future scans",width/1.217,height/1.67);
    }
    if ( idnumber > 2 ){
    fill(56);
    rect(width/7, height/1.80,150,70);
    fill(240);
    textSize(30);
    text("< Prev",width/5.55,height/1.66)
    } else {
        fill(100);
    rect(width/7, height/1.80,150,70);
    fill(240);
    textSize(15);
    text("No previous Scans",width/5.5,height/1.67)
    }
    fill(56);
    textSize(30);
    textAlign(CENTER);
    text(date,width/2,height/1.1);
    fill(colorName);
    ellipse(width/2,height/1.7,400,400);
    ellipseAnimation();
    fill(100);
    rect(0,0,width,height/4);
    fill(50);
    rect(0,height/5,width,50);
    
    fill(mouseY, width/10, height/10,mouseX/10+mouseY/10);
    textSize(70);
    textAlign(CENTER);
    text("COLOR                   PICKER",width/2,height/5.3);
    fill(mouseX/10, height/10, width/10,mouseX/12+mouseY/12);
    textSize(150);
    textAlign(CENTER);
    text("CIS",width/2,height/5.3);
}

function ellipseAnimation() {
    fill(colorName);
    var hex = colorName ;
    var hsv = hexToRgb(hex);
    if (mouseX > 760 && mouseY > 358 && mouseX < 1161 && mouseY < 759) {
        for(var i = 0; i <= width; i += 20) {
            for(var j = 0; j <= height; j += 20) {
                var size = dist(width/2, height/2, i, j);
                size = size/max_distance * 66;
                ellipse(i, j, size, size);
            }
        }
    fill(240);
    textSize(25);
    text("RGB : " + hsv,width/2,height/1.405);
    fill(240);
    textSize(25);
    text("HEX : "+ hex,width/2,height/2);
    }
    
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}