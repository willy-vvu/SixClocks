var font, fontLoaded = false;

function setup() {
	createCanvas(400, 400);
  font = loadFont("RobotoCondensed-Light.ttf");

}

function setDepth(depth) {
	resetMatrix();
	translate(width / 2, height / 2);
	scale(400 / depth);
  translate(0, 100);
  if(isMousePressed){
  	translate(0, (height-mouseY));
  }
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

function draw() {
	background(0);
  // Seconds
	for (var i = 1; i < 120; i+=1) {
		var depth = 50*(i - secondP()%1);
    // var represent = (floor(secondP()) + i)%60;
		setDepth(depth);
		noStroke();
    fill(255);
  	for (var j = -2; j <= 2; j++) {
			rect(j*50-1, -1, 2, 2);
    }
	}
  // Minutes
	for (var i = 1; i < 60; i++) {
		var depth = 60*50*(i - minuteP()%1);
    var represent = (floor(minuteP()) + i)%60;
		setDepth(depth);
		// noStroke();
    noFill();
    strokeWeight(5);
    stroke(255);
		line(-500,0, 500, 0);
    if(font.font){
      noStroke();
      fill(255);
      textAlign(LEFT);
    	textSize(100);
    	textFont(font);
      text(represent, 10, -10);
    }
	}
  // Hours
	for (var i = 1; i < 6; i++) {
		var depth = 60*60*50*(i - minuteP()/60);
    var represent = add12((floor(hourP()) + i)%12);
    setDepth(depth);
    strokeWeight(5*60);
    noFill();
    stroke(255);
    beginShape();
		vertex(-500*60, 0);
    vertex(0, -500*60);
		vertex(500*60, 0);
    endShape(CLOSE);
    if(font.font){
      noStroke();
      fill(255);
      textAlign(RIGHT);
    	textSize(100*60);
    	textFont(font);
      text(represent, 50, -10);
    }
	}

}

function add12(a){
  return a==0?12:a;
}