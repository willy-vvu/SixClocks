// (c) 2016-17 Fathom Information Design BY-NC-SA
// https://creativecommons.org/licenses/by-nc-sa/4.0/


var img;
function setup() {
  createCanvas(400, 400);
  img = loadImage("GlowTemp.png");
}

// noprotect
var lastIndex = Infinity;
function draw() {
  var currentIndex = 60 * (60 * twelveHour() + minute()) + second();
  var requireFullReset = false;
	if(img.width == 1) return; // Wait until image load
  if(currentIndex < lastIndex || currentIndex > lastIndex + 1){
    lastIndex = currentIndex;
    requireFullReset = true;
		blendMode(BLEND);
    background(0);
  }
	else if(currentIndex == lastIndex){
    return;
  }
	lastIndex = currentIndex;

  noStroke();

  blendMode(ADD);

  var hourSizeH = (width / 4);
  var hourSizeV = (height / 3);
  var hourCols = 4;
  var hourMargin = 0.6;
  for (var i = 0; i < 12; i++) {

    var minuteSizeH = (1 / 6);
    var minuteSizeV = (1 / 10);
    var minuteRows = 10;
    var minuteMargin = 0.004;

    // Minutes Loop
    for (var j = 0; j < 60; j++) {

      // Seconds Loop: nearly identical to minutes loop
      var secondSizeH = (1 / 10);
      var secondSizeV = (1 / 6);
      var secondCols = 10;

      // Seconds Loop
      for (var k = 0; k < 60; k++) {
        var index = 60 * (60 * i + j) + k;
        if (index == currentIndex || requireFullReset) {
          var coordX = 0;
          var coordY = 0;
          var scaleX = 1;
          var scaleY = 1;

          // Transform and Scale hack

          coordX += scaleX * (hourSizeH * (i % hourCols) + hourMargin);
          coordY += scaleY * (hourSizeV * floor(i / hourCols) + hourMargin);

          scaleX *= (hourSizeH - 2 * hourMargin);
          scaleY *= (hourSizeV - 2 * hourMargin);

          coordX += scaleX * (minuteSizeH * floor(j / minuteRows) + minuteMargin);
          coordY += scaleY * (minuteSizeV * (j % minuteRows) + minuteMargin);

          scaleX *= (minuteSizeH - 2 * minuteMargin);
          scaleY *= (minuteSizeV - 2 * minuteMargin);

          coordX += scaleX * (secondSizeH * (k % secondCols));
          coordY += scaleY * (secondSizeV * floor(k / secondCols));

          // rect(0, 0, 1, 1);
          fill(60);
        	rect(coordX-0.5, coordY-0.5, 1, 1);
          if(index <= currentIndex){
          	image(img, coordX - 2.5, coordY - 2.5, 5, 5);
          }
        }
      }
      pop();
    }
    pop();
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