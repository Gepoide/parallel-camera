let grid = [];
let sizeX = 60;
let sizeY = 30;
let capture;
let sizeSlider;
let shotButton;
let reverseButton;
let shotIndex = 0;
let backgroundColor = 200;

function setup() {
  createCanvas(windowWidth, windowHeight);

  setupUI();

  updateGrid();
  
  updateCapture();
  
}

function cycleCamera() {
  shotIndex = (shotIndex + 1) % 5;
  updateGrid();
}

function draw() {
  background(backgroundColor);
  capture.loadPixels();
  frameRate(15);

  
  for (let cell of grid) {
    cell.getColor(capture.pixels);

    cell.show(shotIndex);
  }

  updateUI();
}

function savePhoto() {
  saveCanvas(`parallel-camera-${cameraArray[shotIndex].name}`, "png");
}

function updateGrid() {
  grid = [];

  sizeX = round(sizeSlider.value() * cameraArray[shotIndex].x);
  sizeY = round(sizeSlider.value() * cameraArray[shotIndex].y);

  for (let i = 0; i < width + sizeX; i += sizeX) {
    for (let j = 0; j < height + sizeY; j += sizeY) {
      grid.push(new Cell(i, j, sizeX, sizeY));
    }
  }
}

function setupUI() {
  sizeSlider = createSlider(10, 60, 15);
  sizeSlider.id("size-slider");

  shotButton = createButton("S");
  shotButton.id("shot-button");

  reverseButton = createButton("C", "environment");
  reverseButton.id("reverse-button");
  
  select("#title").mouseClicked(cycleCamera);
  sizeSlider.mouseClicked(updateGrid);
  sizeSlider.touchMoved(updateGrid);
  shotButton.mouseClicked(savePhoto);
  reverseButton.mouseClicked(changeCapture);
}

function updateUI() {
  select("#title").html(cameraArray[shotIndex].name);

  centralText(height - 120);
  centralText(48);
}

function centralText(h) {
  push();
  blendMode(EXCLUSION);
  fill(0);
  stroke(255);
  strokeWeight(0.8);
  strokeJoin(ROUND);
  rectMode(CENTER);
  rect(width / 2, h , width - 10, 14, 20);
  textSize(8);
  textAlign(LEFT, CENTER);
  text("VIDEO FEED", 25, h);
  textAlign(CENTER, CENTER);
  text("PARALLEL REPRESENTATION", width / 2, h);
  textAlign(RIGHT, CENTER);
  text(`CAMERA [0${shotIndex}]`, width - 25, h);
  pop();
}

function updateCapture() {
  capture = createCapture(VIDEO, {
    audio: false,
    video: {
      facingMode: reverseButton.value(),
    },
    flipped: false,
  });
  capture.size(width, height + 100);
  capture.hide();
}

function changeCapture() {
  if (reverseButton.value() == "environment") {
    reverseButton.value("user");
  } else {
    reverseButton.value("environment");
  }
  updateCapture();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  capture.size(width, height);
  updateCapture();
  updateGrid();
}
