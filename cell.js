class Cell {
  constructor(x, y, sizeX, sizeY) {
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.col = color(0, 0, 0);
    this.newCol = color(0, 0, 0);
    this.roundness = this.sizeX * 1.8;
    this.scaleIncrement = 1;
  }

  show(shotIndex) {
    
    push();
    translate(this.x,this.y);
    scale(this.scaleIncrement,this.scaleIncrement)
    cameraArray[shotIndex].action(
      0,
      0,
      this.sizeX,
      this.sizeY,
      this.col,
      this.newCol,
      this.scaleIncrement,
      this.roundness
    );
    pop();
  }

  getColor(array) {
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 0;
    let counter = 0;

    for (let i = 0; i < this.sizeX; i++) {
      for (let j = 0; j < this.sizeY; j++) {
        let index = 4 * ((this.y + j) * capture.width + (this.x + i));

        r += array[index];
        g += array[index + 1];
        b += array[index + 2];
        a += array[index + 3];
        counter++;
      }
    }
    this.col = color(r / counter, g / counter, b / counter, a / counter);
  }

  falloff() {
    let d = dist(mouseX, mouseY, this.x, this.y);

    this.scaleIncrement = map(d, 0, 50, -2, 1, true);
  }
}