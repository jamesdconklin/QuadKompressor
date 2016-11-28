const THRESHOLD = 500;

class QTNode {
  constructor(pixels, x, y, dim) {
    this.x = x;
    this.y = y;
    this.dim = dim;

    this.color = null;
    // idx 0 -> NW. Increases clockwise.
    this.children = [];

    let { average, variance } = this.chromaticAnalysis(pixels, x, y, dim);

    if ( variance > THRESHOLD) {
      this.children.push(new QTNode(pixels, x, y, dim/2));
      this.children.push(new QTNode(pixels, x+dim/2, y, dim/2));
      this.children.push(new QTNode(pixels, x+dim/2, y+dim/2, dim/2));
      this.children.push(new QTNode(pixels, x, y+dim/2, dim/2));
    } else {
      this.color = average;
    }

  }

  chromaticDifference(v1, v2) {
    let redDiff = v1.red-v2.red,
        greenDiff = v1.green-v2.green,
        blueDiff = v1.blue-v2.blue;

    let diff = redDiff + greenDiff + blueDiff;
    console.log()
    return diff;
  }

  chromaticAnalysis(pixels, x0, y0, dim) {
    let redBar = 0, greenBar = 0, blueBar = 0;

    for (var x = x0; x < x0+dim; x++) {
      for (var y = y0; y < y0+dim; y++) {
        let { red, green, blue } = pixels[x][y];
        redBar += red; greenBar += green, blueBar += blue;
      }
    }
    let count = Math.pow(dim, 2);
    redBar /= count;
    greenBar /= count;
    blueBar /= count;

    let colorBar = {
      red: redBar,
      green: greenBar,
      blue: blueBar
    };
    debugger
    let summedSquares = 0;

    for (var x = x0; x < x0+dim; x++) {
      for (var y = y0; y < y0+dim; y++) {
        summedSquares += this.chromaticDifference(colorBar, pixels[x][y]);
      }
    }

    return {
      average: colorBar,
      variance: summedSquares / count
    };

  }
}

export default QTNode;
