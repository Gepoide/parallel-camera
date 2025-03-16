
function carpetFiberFunction(
  x,
  y,
  sizeX,
  sizeY,
  col,
  newCol,
  scaleIncrement,
  roundness
) {
  noStroke();
  let b = brightness(col);
  let r = map(b, 0, 100, 0, Math.PI / 2, true);

  newCol = round(map(b, 30, 100, 0, 220) / 50) * 50;

  push();
  translate(x, y);
  rotate(r + (scaleIncrement - 1) * (-Math.PI / 4));
  scale(scaleIncrement, scaleIncrement);
  fill(newCol);
  rectMode(CENTER);
  stroke(newCol);
  strokeWeight(1);

  rect(0, 0, sizeX * 1.8, sizeY * 1.8, roundness);
  textAlign(LEFT, CENTER);
  textSize(8);
  textStyle(BOLD);
  if (b < 60) {
    fill(200);
  } else {
    fill(0);
  }
  pop();
}


function multiLinesFunction(
  x,
  y,
  sizeX,
  sizeY,
  col,
  newCol,
  scaleIncrement,
  roundness
) {
  noStroke();
  let b = brightness(col);
  let r = map(b, 10, 100, 0, 100);
  let s = map(b, 30, 90, sizeX, 0, true);
  let colorArray = [
    color(185, 85, 200),
    color(95, 195, 145),
    color(70, 85, 245),
    color(210, 60, 95),
    color(0, 0, 0),
  ];
  let startingRange = 0;
  let endingRange = 100;
  let interval = endingRange / 4;

  if (r >= startingRange && r < interval) {
    newCol = colorArray[4];
  } else if (r >= interval && r < interval * 2) {
    newCol = colorArray[0];
  } else if (r >= interval * 2 && r < interval * 3) {
    newCol = colorArray[2];
  } else if (r >= interval * 3 && r <= endingRange) {
    newCol = colorArray[1];
  }

  fill(0);
  rectMode(CENTER);
  rect(x, y, s, sizeY*1.1);
}

function soundWavesFunction(
  x,
  y,
  sizeX,
  sizeY,
  col,
  newCol,
  scaleIncrement,
  roundness
) {
  noStroke();
  let b = brightness(col);
  let s;
  let colorArray = [
    color(185, 85, 200),
    color(95, 195, 145),
    color(70, 85, 245),
    color(210, 60, 95),
    color(0, 0, 0),
  ];

  if (b > 70) {
    s = 38;
  } else {
    s = 0;
  }

  push();
  stroke(0);
  translate(x, y);
  noStroke();
  fill(backgroundColor);
  rectMode(CENTER);
  ellipse(0, 0, sizeX, sizeY * s * 1.2);
  fill(0);
  ellipse(0, 0, sizeX / 1.5, (sizeY * (s * 1.2)) / 1.5);
  pop();

}


function asciiCameraFunction(
  x,
  y,
  sizeX,
  sizeY,
  col,
  newCol,
  scaleIncrement,
  roundness
) {
  noStroke();
  let b = brightness(col);
  let r = map(b, 10, 100, 0, 100);
  let startingRange = 0;
  let endingRange = 100;
  let interval = endingRange / 5;
  let stringArray = ["█", "▓", "▒", "░", " "];
  let string = " ";

  if (r >= startingRange && r < interval) {
    string = stringArray[4];
  } else if (r >= interval && r < interval * 2) {
    string = stringArray[3];
  } else if (r >= interval * 2 && r < interval * 3) {
    string = stringArray[2];
  } else if (r >= interval * 3 && r <= endingRange * 4) {
    string = stringArray[1];
  } else if (r >= interval * 4 && r <= endingRange) {
    string = stringArray[0];
  }

  fill(0);

  textSize(sizeY / 1.13);
  textAlign(CENTER, CENTER);
  textFont("Courier New");
  text(string, x, y);
}


function dotsFunction(
  x,
  y,
  sizeX,
  sizeY,
  col,
  newCol,
  scaleIncrement,
  roundness
) {
  noStroke();
  let b = brightness(col);

  fill(0);
  if (b > 60) {
    ellipse(x, y, sizeX * 2, sizeY * 2);
  }
}

let carpetFiber = {
  name: "Carpet Fiber",
  action: carpetFiberFunction,
  x: 1,
  y: 1,
};

let multiLines = {
  name: "Multi-Lines",
  action: multiLinesFunction,
  x: 1,
  y: 2,
};

let soundWaves = {
  name: "Sound Waves",
  action: soundWavesFunction,
  x: 1,
  y: 1,
};

let asciiCamera = {
  name: "ASCII",
  action: asciiCameraFunction,
  x: 1,
  y: 1.9,
};

let dots = {
  name: "Dots",
  action: dotsFunction,
  x: 1,
  y: 1,
};

let cameraArray = [carpetFiber, multiLines, soundWaves, asciiCamera, dots];
