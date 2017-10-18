var hexCodes;
var unit = 50;
var count;
var mods = [];
var r, g, b;
var num = 0;
var n = num.toString();

function preload() {
  // Get the most recent earthquake in the database
  var x = 6
  var url = 'https://api.mlab.com/api/1/databases/paulrotardb/collections/colorcatcheds?q={"_id":6}&f={"__v":0}&fo=true&apiKey=LB-XNdkgi7CtjESs60AEZQLTP7PRAR1b';
  //var url = 'https://api.mlab.com/api/1/databases/paulrotardb/collections/colorcatcheds?apiKey=LB-XNdkgi7CtjESs60AEZQLTP7PRAR1b';
  hexCodes = loadJSON(url);
  
}

function addInput(){
    document.getElementById('colorpicker').value = "#" + hexCodes.color;
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
  var wideCount = width / unit;
  var highCount = height / unit;
  count = wideCount * highCount;

  var index = 0;
  for (var y = 0; y < highCount; y++) {
    for (var x = 0; x < wideCount; x++) {
      mods[index++] = new Module(x*unit, y*unit, unit/2, unit/2, 
        random(0.05, 0.8), unit);
    }
  }
    setInterval(changeBG,400);
}

function changeBG() {
    r = random(255);
    g = random(255);
    b = random(255);
    
}

function draw() {
  background(200);
  // Get the magnitude and name of the earthquake out of the loaded JSON
  var colorHEX = hexCodes.color;
  var colorName = hexCodes.color;
    for (var i = 0; i < count; i++) {
    mods[i].update();
    mods[i].draw();
  }
    drawImportant();
    addInput();
}

function Module(_xOff, _yOff, _x, _y, _speed, _unit) {
  this.xOff = _xOff;
  this.yOff = _yOff;
  this.x = _x;
  this.y = _y;
  this.speed = _speed;
  this.unit = _unit;
  this.xDir = 1;
  this.yDir = 1;
}

// Custom method for updating the variables
Module.prototype.update = function() {
  this.x = this.x + (this.speed * this.xDir);
  if (this.x >= this.unit || this.x <= 0) {
    this.xDir *= -1;
    this.x = this.x + (1 * this.xDir);
    this.y = this.y + (1 * this.yDir);
  }
  if (this.y >= this.unit || this.y <= 0) {
    this.yDir *= -1;
    this.y = this.y + (1 * this.yDir);
  }
}

// Custom method for drawing the object
Module.prototype.draw = function() {
  fill(r, g, b, 155);
  ellipse(this.xOff + this.x, this.yOff + this.y, 6, 6);
}

function drawImportant(){
    var colorHEX = hexCodes.color;
  var colorName = hexCodes.color;
    fill(120);
    rect(0,0,400,height);
    fill(100);
    rect(0,0,width,200);
    fill(50);
    rect(0,height/5,width,50);
    fill(255);
    textSize(30);
    textAlign(CENTER);
    text(colorName,width/2,height/20);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}