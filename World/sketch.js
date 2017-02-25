var p;
// noprotect

function setup() {
  createCanvas(400, 400);
  p = createGraphics(400, 400);
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

function draw() {
  var timeCont = Date.now() / ((a ? 1 : 60 * 60) * 60 * 1000);
  var time = a ? (secondP() / 30) % 1 : hourP() / 24;
  var dayNight = constrain(0.5 - 10 * Math.cos(TAU * time), 0, 1);
  var skyColor;
  p.background(skyColor = lerp(0, 100, dayNight));

  // Sky
  // Markers
  p.fill(255);
  p.strokeWeight(1);
  for (var i = 1; i < 24; i++) {
    p.push();
    p.translate(width / 2, height / 2);
    var rotation = map(i, 0, 24, 0, PI);
    p.rotate(rotation);
    p.translate(-width / 2.5, 0);
    p.rotate(PI / 4 - rotation);
    p.stroke(255);
    p.scale(i % 6 == 0 ? 2 : i % 2 == 0 ? 1 : 0.5);
    p.rect(-1, -1, 2, 2);
    p.pop();
  }

  // Stars
  if (time < 0.3 || time > 0.7) {
    for (var i = 0; i < 100; i++) {
      p.push();
      p.translate(width / 2, height / 2);
      var rotation = timeCont % TWO_PI;
      p.rotate(rotation);
      p.translate(noise(i, 1) * width * 1.3, noise(i, 2) * height * 1.3);
      p.translate(-width / 2, -height / 2);
      p.rotate(PI / 4 - rotation);
      p.noStroke();
      p.fill(255, 255 * (1 - dayNight));
      p.scale(0.5 * noise(i, 3));
      p.rect(-1, -1, 2, 2);
      p.pop();
    }
  }


  // Sun and Moon
  var sunMoonSize = 15;
  var moonPhase = 0.6;
  p.push();
  p.translate(width / 2, height / 2);
  var rotation = time * TWO_PI;
  p.rotate(rotation);
  p.push();
  p.translate(0, width / 2.5);
  p.rotate(PI / 4 - rotation);
  p.noStroke();
  p.fill(255, 150);
  p.rect(-sunMoonSize, -sunMoonSize, 2 * sunMoonSize, 2 * sunMoonSize);
  p.fill(255, 150);
  p.rect(-sunMoonSize * 0.8, -sunMoonSize * 0.8, 2 * sunMoonSize * 0.8, 2 * sunMoonSize * 0.8);
  p.fill(255);
  p.rect(-sunMoonSize * 0.6, -sunMoonSize * 0.6, 2 * sunMoonSize * 0.6, 2 * sunMoonSize * 0.6);
  p.pop();
  p.push();
  p.translate(0, -width / 2.5);
  p.rotate(PI / 4 - rotation);
  p.noStroke();
  p.fill(skyColor);
  p.rect(-sunMoonSize, -sunMoonSize, 2 * sunMoonSize, 2 * sunMoonSize);
  p.fill(255);
  p.beginShape();
  p.vertex(-sunMoonSize, -sunMoonSize);
  p.vertex(-sunMoonSize, sunMoonSize);
  p.vertex(sunMoonSize, sunMoonSize);
  p.vertex(-sunMoonSize * moonPhase, sunMoonSize * moonPhase);
  p.endShape();
  p.pop();
  p.pop();

  // Clouds
  for (var i = 0; i < 5; i++) {
    var offset = (a?1:1000) * timeCont;
    var cluster = round(1 + 3 * noise(i, 100));
    for (var j = 0; j <= cluster; j++) {
      p.push();
      p.translate((mod(-offset + noise(i, 3, offset), 1) - 0.25) * width * 2, noise(i, 4, offset / 2) * height / 3);
      p.translate(noise(j, 10, offset) * 20 + 20 * j, noise(j, 11, offset) * 10);
      p.scale(20 + 10 * noise(i, 5, offset) + 10 * sin(PI * j / cluster));
      for (var color = 0; color <= 1; color++) {
        p.noStroke();
        p.fill(color == 0 ? lerp(40, 255, dayNight) : lerp(25, 235, dayNight), 255);
        p.beginShape();
        p.vertex(-1, 0);
        p.vertex(0, color == 0 ? -1 : 0.1);
        p.vertex(1, 0);
        p.vertex(0, 0.3);
        p.endShape(CLOSE);
      }
      p.pop();
    }
  }
  // Ground
  p.noStroke();
  var groundColor;
  p.fill(groundColor = lerp(60, 250, dayNight));
  p.rect(0, height / 2, width, height / 2);

  // Mountains
  p.beginShape();
  p.vertex(width / 3, height / 2);
  p.vertex(width / 2, height / 3);
  p.vertex(2 * width / 3, height / 2);
  p.endShape(CLOSE);
  p.beginShape();
  p.vertex(width / 4, height / 2);
  p.vertex(1.5 * width / 4, 1.5 * height / 4);
  p.vertex(2 * width / 4, height / 2);
  p.endShape(CLOSE);
  p.beginShape();
  p.vertex(2.75 * width / 5, height / 2);
  p.vertex(3.25 * width / 5, 2 * height / 5);
  p.vertex(3.75 * width / 5, height / 2);
  p.endShape(CLOSE);

  var shadowCycle = (time * 2 + 0.5) % 1;
  var shadowCycleL = max(1 - 2 * shadowCycle, 0);
  var shadowCycleR = min(2 - 2 * shadowCycle, 1);
  var shadowIncline = 0.2;
  p.fill(lerp(40, 200, dayNight));
  p.beginShape();
  p.vertex(lerp(1, 2, shadowCycleR) * width / 3, height / 2);
  p.vertex(width / 2, height / 3);
  p.vertex(lerp(1, 2, shadowCycleL) * width / 3, height / 2);

  p.vertex(lerp(1, 2, 0.5 + 0.5 * cos(PI * shadowCycle)) * width / 3, lerp(height / 2, 2 * height / 3, shadowIncline * sin(PI * shadowCycle)));
  p.endShape(CLOSE);
  p.beginShape();
  p.vertex(lerp(1, 2, shadowCycleR) * width / 4, height / 2);
  p.vertex(1.5 * width / 4, 1.5 * height / 4);
  p.vertex(lerp(1, 2, shadowCycleL) * width / 4, height / 2);
  p.vertex(lerp(1, 2, 0.5 + 0.5 * cos(PI * shadowCycle)) * width / 4, lerp(height / 2, 2.5 * height / 4, shadowIncline * sin(PI * shadowCycle)));
  p.endShape(CLOSE);
  p.beginShape();
  p.vertex(lerp(2.75, 3.75, shadowCycleR) * width / 5, height / 2);
  p.vertex(3.25 * width / 5, 2 * height / 5);
  p.vertex(lerp(2.75, 3.75, shadowCycleL) * width / 5, height / 2);
  p.vertex(lerp(2.75, 3.75, 0.5 + 0.5 * cos(PI * shadowCycle)) * width / 5, lerp(height / 2, 3 * height / 5, shadowIncline * sin(PI * shadowCycle)));
  p.endShape(CLOSE);

  image(p, 0, 0);

  var poolMarginTop = 40;
  var poolMarginBottom = 60;
  var poolHeight = height / 2 - poolMarginBottom - poolMarginTop;

  // 
  // Compute Reflected pool
  // p.loadPixels();
  // var sqside = sqrt(p.pixels.length/4);
  // for(var i = sqside/2 - poolMarginBottom; i-- > poolMarginTop;){
  //   for(var j = i; j-- > -i;){
  //     var y = sqside/2 - i;
  //     var x = sqside/2 + j;
  //     var dx = (hmm(x+(timeCont*10000000)|0) + hmm(y))&3;
  //     var dy = (hmm(x<<1+(timeCont*10000000)|0) + hmm(y<<1))&3 * (i>>8);
  //     for(var k = 0; k < 4; k++){
  //       p.pixels[k+4*(sqside * y + x)] = 
  //       p.pixels[k+4*(sqside * (y+dx) + (x-dy))];
  //     }
  //   }
  // }
  // p.updatePixels();

  // Reflecting Pool
  push();
  translate(0, height / 2);
  scale(1, -1);
  translate(0, -height / 2);
  p.background(0, 20); // Darken pool
  image(p, 0, poolMarginBottom, width, poolHeight,
    0, poolMarginBottom, width, poolHeight);
  pop();

  noStroke();
  fill(groundColor);
  quad(0, height / 2 + poolMarginTop,
    width / 2 - poolMarginTop, height / 2 + poolMarginTop,
    poolMarginBottom, height - poolMarginBottom,
    0, height - poolMarginBottom);
  quad(width, height / 2 + poolMarginTop,
    width / 2 + poolMarginTop, height / 2 + poolMarginTop,
    width - poolMarginBottom, height - poolMarginBottom,
    width, height - poolMarginBottom);
  noFill();
  strokeWeight(5);
  stroke(lerp(50, 220, dayNight));
  quad(width / 2 - poolMarginTop, height / 2 + poolMarginTop,
    poolMarginBottom, height - poolMarginBottom,
    width - poolMarginBottom, height - poolMarginBottom,
    width / 2 + poolMarginTop, height / 2 + poolMarginTop
  );
  // Ground Cover

  stroke(lerp(40, 200, dayNight));
  strokeWeight(1.5);
  line(width / 12, 2 * height / 3, width / 6, 2 * height / 3);
  line(11 * width / 12, 2 * height / 3, 5 * width / 6, 2 * height / 3);
  // strokeWeight(1);
  // line(9*width/12, 3.5*height/6, 9.5*width/12, 3.5*height/6);
  // strokeWeight(2.5);
  // line(11*width/12, 4.5*height/6, 12*width/12, 4.5*height/6);
}
// function hmm(a){
//     a = (a ^ 60) ^ (a >> 14);
//     a = a + (a << 3);
//     a = a ^ (a >> 4);
//     a = a * 0x27d4eb2d;
//     a = a ^ (a >> 15);
//     return a;
// }
function mod(a, b) {
  return (a % b + b) % b;
}

var a = false;
function keyPressed(e) {
  if (e.key == "~") {
    a = !a;
  }
}