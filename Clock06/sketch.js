// (c) 2016-17 Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0

var font;

function setup() {
  createCanvas(400, 400);
  font = loadFont("RobotoCondensed-Light.ttf");
  // Font hack
}
var fontLoaded = false;

function draw() {
  background(0);
  fill(0);
  noStroke();
  ellipseMode(RADIUS);

  var startAngle = radians(-90);
  var stopAngle = radians(270);

  var cx = width / 2;
  var cy = height / 2;

  var secondRadius = width * 0.4;
  var minuteRadius = secondRadius * 0.9;
  var minuteSpacing = 0.38;
  var minuteWidth = 30;
  var hourRadius = minuteRadius * 0.7;
  var innerRadius = hourRadius * 0.8;
  var hourSpacing = 0.1;
  var hourWidth = 10;

  strokeWeight(2);

//   stroke(50);
//   noFill();
//   ellipse(cx, cy, secondRadius, secondRadius);
//   stroke(100);
  for (var i = 0; i < 60; i++) {
		if (second() > i) {
      stroke(255 * colorDip(i/60));
    } else {
      stroke(70 * colorDip(i/60));
    }
    var secondStart = map(i + minuteSpacing, 0, 60, startAngle, stopAngle);
    var secondEnd = map(i + 1 - minuteSpacing, 0, 60, startAngle, stopAngle);
    arc(cx, cy, secondRadius, secondRadius,
      secondStart, secondEnd);
  }
  //   stroke(50);
//   noFill();
//   ellipse(cx, cy, secondRadius, secondRadius);


  noStroke();
  for (var i = 0; i < 60; i++) {
    if (minute() > i) {
      fill(255);
    } else {
      fill(30);
    }
    var minuteStart = map(i + minuteSpacing, 0, 60, startAngle, stopAngle);
    var minuteEnd = map(i + 1 - minuteSpacing, 0, 60, startAngle, stopAngle);
    arc(cx, cy, hourRadius + minuteWidth, hourRadius + minuteWidth,
      minuteStart, minuteEnd);
  }
  noStroke();
  fill(0);
  ellipse(cx, cy, hourRadius, hourRadius);

  noStroke();
  for (var i = 0; i < 12; i++) {
    if (hour() % 12 > i) {
      // if(hour() > i && hour() - 12 <= i){
      fill(255);
    } else {
      fill(30);
    }
    var hourStart = map(i + hourSpacing, 0, 12, startAngle, stopAngle);
    var hourEnd = map(i + 1 - hourSpacing, 0, 12, startAngle, stopAngle);
    arc(cx, cy, innerRadius + hourWidth, innerRadius + hourWidth,
      hourStart, hourEnd);
  }
  noStroke();
  fill(0);
  ellipse(cx, cy, innerRadius, innerRadius);

  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  if (font.font) {
    // console.log(font.font);
    textFont(font);
    textSize(20);
    if(!fontLoaded){
      // Font hack
      _renderer._textFont.brokenTextBounds = _renderer._textFont.textBounds;
      _renderer._textFont.textBounds = function(l, s){
        return _renderer._textFont.brokenTextBounds(l.replace(/:/g, "."), s);
      }
    }
    fontLoaded = true;
    text(hoursMinutesSeconds(), width / 2, height / 2);
  }
}
function mod(a, b){
  return (a % b + b) % b;
}
function colorDip(factor) {
	return constrain(//0.4 + 0.6 * mod((factor - (Date.now() % 60000)/60000), 1)
                   0.7 + 0.3 * max(-20 + 21*cos(TWO_PI*(factor - (Date.now() % 1000)/1000 - (Date.now() % 60000)/60000)), 0), 0, 1);
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