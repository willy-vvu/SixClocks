var font;

function setup() {
  createCanvas(400, 400);
  font = loadFont("RobotoCondensed-Light.ttf");
}
var secondSpacing = 100;

function draw() {
  background(0);
  noFill();
  // Seconds
  noFill();
  // Seconds
  for (var i = -10; i <= 10; i++) {
    var mi = i - secondP() % 1;
    var identity = mod(floor(secondP() + i), 60);
	  strokeWeight(1);
    stroke(100, 255 * (1 - abs(mi) / 10));
   	noFill();
    drawLine(mi);
    if (font.font && i > -4 && i < 4) {
      stroke(0, 150);
      strokeWeight(2);
      textFont(font);
      fill(100);
      textAlign(CENTER);
      textSize(30);
      text(identity, getXPos(mi, height * 0.9), height * 0.9 + 20);
    }
  }
  
  // Minutes
  for (var i = -10; i <= 10; i++) {
    var mi = i - minuteP() % 1;
    var identity = mod(floor(minuteP() + i), 60);
	  strokeWeight(1);
    stroke(200, 255 * (1 - abs(mi) / 10));
    noFill();
    drawLine(mi * 60);
    if (font.font && i > -4 && i < 4) {
      stroke(0, 150);
      strokeWeight(2);
      textFont(font);
      fill(255);
      textAlign(CENTER);
      textSize(30);
      text(identity, getXPos(mi * 60, height * 0.5), height * 0.5 + 20);
    }
  }
  // noFill();
  // Hours
  for (var i = -3; i <= 3; i++) {
    var mi = i - hourP() % 1;
    var identity = add12(mod(floor(hourP() + i), 12));
    strokeWeight(2);
    stroke(200);
    noFill();
    drawLine(mi * 60 * 60);
    if (font.font && i > -2 && i < 2) {
      stroke(0, 150);
      strokeWeight(2);
      textFont(font);
      fill(255);
      textAlign(CENTER);
      textSize(30);
      text(identity, getXPos(mi * 60 * 60, height * 0.1), height * 0.1 + 20);
    }
  }

  //Master Line
  strokeWeight(1);
  stroke(200);
  line(width / 2, 0, width / 2, height);

}

function drawLine(second) {
  beginShape();
  for (var y = 0; y <= height + 10; y += 10) {
    vertex(getXPos(second, y), y);
  }
  endShape();
}

function getXPos(second, yPos) {
  return width / 2 + secondSpacing * second * pow(1 / 60, map(yPos, 0, height, 2.2, -0.2));
}

function mod(a, b) {
  return (a % b + b) % b;
}

function hourP() {
  return hour() + minuteP() / 60;
}

function minuteP() {
  return (Date.now() / 1000 / 60) % 60;
}

function secondP() {
  return (Date.now() / 1000) % 60;
}

function add12(a) {
  return a == 0 ? 12 : a;
}