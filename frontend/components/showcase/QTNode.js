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

    draw(ctx) {
      let {fillStyle} = ctx
      let timeout = 0
      if (this.children.length) {
        this.children.forEach((child) => {
          setTimeout(() =>{
            child.draw(ctx)
          }, timeout);
          timeout += 250;
        })
      } else {
        let colorStr = this.colorString();
          if (this.dim > 1) {
            for (var i = 1; i <= this.dim/2; i++) {
              let j = i;
              setTimeout(
                () => {
                  ctx.beginPath();
                  ctx.fillStyle = colorStr;
                  ctx.rect(
                    this.x + Math.floor(this.dim/2) - j,
                    this.y + Math.floor(this.dim/2) - j,
                    j * 2,
                    j * 2
                  );
                  ctx.fill();
                  ctx.fillStyle = fillStyle;
                },
                j*25-25
              );
            }

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
      let {red, green, blue} = this.color
      red = Math.floor(red).toString(16)
      green = Math.floor(green).toString(16)
      blue = Math.floor(blue).toString(16)

      for (; red.length < 2; red = "0" + red);
      for (; green.length < 2; green = "0" + green);
      for (; blue.length < 2; blue = "0" + blue);
      return `#${red}${green}${blue}`;
    }

    promiseActions(variance, average, pixels, x, y, dim) {
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     if ( variance > THRESHOLD) {
      //       this.children.push(new QTNode(pixels, x, y, dim/2, this.ctx));
      //       this.children.push(new QTNode(pixels, x+dim/2, y, dim/2, this.ctx));
      //       this.children.push(new QTNode(pixels, x+dim/2, y+dim/2, dim/2, this.ctx));
      //       this.children.push(new QTNode(pixels, x, y+dim/2, dim/2, this.ctx));
      //       resolve(`this is x: ${x} and this is y ${y}`)
      //     } else {
      //       this.color = average;
      //       // reject(this.draw)
      //       this.draw()
      //       reject(`this is where I would do something else, like setting the color`)
      //     }
      //   }, 300);
      // });
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
