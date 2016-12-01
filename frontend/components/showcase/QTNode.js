
class QTNode {
  constructor(pixels, x, y, dim, threshold = 300) {
    this.x = x;
    this.y = y;
    this.dim = dim;
    this.threshold = threshold
    this.color = null;
    // idx 0 -> NW. Increases clockwise.
    this.children = [];

    let { average, variance } = this.chromaticAnalysis(pixels, x, y, dim);

    if ( variance > this.threshold) {
      this.children.push(new QTNode(pixels, x, y, dim/2, this.threshold));
      this.children.push(new QTNode(pixels, x+dim/2, y, dim/2, this.threshold));
      this.children.push(new QTNode(pixels, x+dim/2, y+dim/2, dim/2, this.threshold));
      this.children.push(new QTNode(pixels, x, y+dim/2, dim/2, this.threshold));
    } else {
      this.color = average;
    }
  }

  drawCollapse(ctx, color) {
    for (var i = 0; i <= this.dim/2; i++) {
      let { fillStyle } = ctx;
      let j = i;
      setTimeout(
        () => {
          ctx.fillStyle = color;
          ctx.beginPath();
          this.drawCollapseIteration(ctx, j);
          ctx.fillStyle = fillStyle;
        },
        j*25-25
      );
    }
  }

  drawCollapseIteration(ctx, iteration) {
    ctx.rect(
      this.x,
      this.y,
      this.dim,
      this.dim
    );

    ctx.fill();

    ctx.clearRect(
      this.x + iteration,
      this.y + iteration,
      this.dim - 2 * iteration,
      this.dim - 2 * iteration
    );
  }

  drawExplode(ctx, color) {
    for (var i = 0; i <= this.dim/2; i++) {
      let { fillStyle } = ctx;
      let j = i;
      setTimeout(
        () => {
          ctx.fillStyle = color;
          ctx.beginPath();
          this.drawExplodeIteration(ctx, j);
          ctx.fillStyle = fillStyle;
        },
        j*25-25
      );
    }
  }

  drawExplodeIteration(ctx, iteration) {
    ctx.rect(
      this.x + Math.floor(this.dim/2) - iteration,
      this.y + Math.floor(this.dim/2) - iteration,
      iteration * 2,
      iteration * 2
    );
    ctx.fill();
  }

  drawFade(ctx, color) {
    for (var i = 1; i <= 20; i++) {
      let { fillStyle, globalAlpha } = ctx;
      let j = i;
      setTimeout(
        () => {
          ctx.globalAlpha = j * .05;
          ctx.fillStyle = color;
          ctx.beginPath();
          this.drawFadeIteration(ctx);
          ctx.fillStyle = fillStyle;
          ctx.globalAlpha = globalAlpha;
        },
        j*50-50
      );
    }
  }

  drawFadeIteration(ctx) {
    ctx.rect(
      this.x,
      this.y,
      this.dim,
      this.dim
    );
    ctx.fill();
  }

  drawRadialOut(ctx, color, quadrant) {
    for (var i = 1; i <= this.dim; i++) {
      let { fillStyle } = ctx;
      let j = i;
      setTimeout(
        () => {
          ctx.fillStyle = color;
          ctx.beginPath();
          this.drawRadialOutIteration(ctx, j, quadrant);
          ctx.fillStyle = fillStyle;
        },
        j*25-25
      );
    }
  }

  drawRadialOutIteration(ctx, iteration, quadrant) {
    let x_o = quadrant[0] < 0 ? this.x - iteration + this.dim : this.x;
    let y_o = quadrant[1] < 0 ? this.y - iteration + this.dim : this.y;

    ctx.rect(
      x_o,
      y_o,
      iteration,
      iteration
    );
    ctx.fill();
  }
  drawRadialIn(ctx, color, quadrant) {
    for (var i = 1; i <= this.dim; i++) {
      let { fillStyle } = ctx;
      let j = i;
      setTimeout(
        () => {
          ctx.fillStyle = color;
          ctx.beginPath();
          this.drawRadialInIteration(ctx, j, quadrant);
          ctx.fillStyle = fillStyle;
        },
        j*25-25
      );
    }
  }

  drawRadialInIteration(ctx, iteration, quadrant) {
    let x_o = quadrant[0] > 0 ? this.x - iteration + this.dim : this.x;
    let y_o = quadrant[1] > 0 ? this.y - iteration + this.dim : this.y;

    ctx.rect(
      x_o,
      y_o,
      iteration,
      iteration
    );
    ctx.fill();
  }


  draw(ctx, quadrant = [-1, -1]) {
    let timeout = 0;
    let { fillStyle, globalAlpha, lineWidth } = ctx;
    let quadrants = [[-1, -1],[1, -1],[1, 1],[-1, 1]]
    if (this.children.length) {
      this.children.forEach((child, idx) => {
        setTimeout(() =>{
          child.draw(ctx, quadrants[idx]);
        }, timeout);
        timeout += 250;
      });
    } else {
      let colorStr = this.colorString();
        if (this.dim > 1) {

          this.drawRadialOut(ctx, colorStr, quadrant);

        } else {
          ctx.beginPath();
          ctx.fillStyle = colorStr;
          ctx.rect(
            this.x,
            this.y,
            1,
            1
          );
          ctx.fill();
          ctx.fillStyle = fillStyle;

        }
    }

  }

  colorString () {
    let {red, green, blue} = this.color;
    red = Math.floor(red).toString(16);
    green = Math.floor(green).toString(16);
    blue = Math.floor(blue).toString(16);

    for (; red.length < 2; red = "0" + red);
    for (; green.length < 2; green = "0" + green);
    for (; blue.length < 2; blue = "0" + blue);
    return `#${red}${green}${blue}`;
  }


  chromaticDifference(v1, v2) {
    let redDiff = Math.pow(v1.red-v2.red, 2),
        greenDiff = Math.pow(v1.green-v2.green, 2),
        blueDiff = Math.pow(v1.blue-v2.blue, 2);

    let diff = redDiff + greenDiff + blueDiff;
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
