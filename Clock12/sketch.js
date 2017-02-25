// (c) 2016-17 Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0

var font, fontLoaded = false;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
  strokeCap(ROUND);
  smooth(2);
  font = loadFont("RobotoCondensed-Light.ttf");
}


function draw() {
  background(0);

  push();
  translate(width / 2, height / 2);
  noFill();
  stroke(255);

  var innerSize = 60;

  push();
  strokeWeight(6);
  var hourSize = 120;
  var hourAngle = map(hourP() % 12, 0, 12, 0, TAU);
  rotate(hourAngle);
  line(0, -innerSize, 0, -hourSize);
  noStroke();
  fill(0);
  ellipse(0, -hourSize, 4, 4);
  pop();

  push();
  strokeWeight(4);
  var minuteSize = 140;
  var minuteAngle = map(minuteP(), 0, 60, 0, TAU);
  rotate(minuteAngle);
  line(0, -innerSize, 0, -minuteSize);
  stroke(0);
  strokeWeight(1.5);
  line(0, -innerSize + 2*(innerSize - minuteSize)/3, 0, -minuteSize);
  pop();

  push();
  strokeWeight(1.5);
  var secondSize = 160;
  var secondAngle = map(secondP(), 0, 60, 0, TAU);
  rotate(secondAngle);
  line(0, -innerSize, 0, -secondSize+1);
  // fill(0);
  ellipse(0, -secondSize - 3, 8, 8);
  pop();

  fill(255);
  strokeWeight(1);
  for (var i = 0; i < 60; i++) {
    push();
    rotate(map(i, 0, 60, 0, TAU));
    if(i % 5 == 0){
      stroke(255);
      line(0, -secondSize + 8, 0, -secondSize - 3);
    }
    else{
      noStroke();
      ellipse(0, -secondSize - 3, 2, 2);
    }
    pop();
  }

  pop();

  if (font.font) {
    textFont(font);
    textSize(20);
    if (!fontLoaded) {
      // Font hack
      _renderer._textFont.brokenTextBounds = _renderer._textFont.textBounds;
      _renderer._textFont.textBounds = function(l, s) {
        return _renderer._textFont.brokenTextBounds(l.replace(/:/g, "."), s);
      }
    }
    noStroke();
    fill(255);
    fontLoaded = true;
    text(hoursMinutesSeconds(), width / 2, height / 2);
  }
}


// return hours that read 1 through 12 rather than 0 through 23
function twelveHour() {
  var h = hour() % 12;
  if (h === 0) {
    h = 12;
  }
  return h;
}


// format hours and minutes
function hoursMinutes() {
  return nf(twelveHour(), 2) + ':' + nf(minute(), 2);
}


// format hours, minutes, and seconds
function hoursMinutesSeconds() {
  return hoursMinutes() + ':' + nf(second(), 2);
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