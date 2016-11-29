import React, { PropTypes } from 'react'
import {CloudinaryImage, cloudinaryConfig} from 'react-cloudinary'
import Cookies from 'cookies-js'
import QTNode from 'QTNode'


class Showcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dimension: 512, tree: null, raw_img: null};
    this.cloudUpdate = this.cloudUpdate.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.buildQuadTree = this.buildQuadTree.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllImages(Cookies.get('user_id'))

    if (this.props.currentImage) {
      this.loadImage()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentImage && nextProps.currentImage !== this.props.currentImage) {
      this.loadImage(nextProps)
    }
  }

  buildQuadTree(ctx, dim) {
    let pixels = [];
    for (var x = 0; x < dim; x++) {
      pixels.push([]);
      for (var y = 0; y < dim; y++) {
        let raw = ctx.getImageData(x,y, 1, 1).data;
        pixels[x].push({
          red: raw[0],
          green: raw[1],
          blue: raw[2],
          alpha: raw[3]
        });
      }
    }
    let root = new QTNode(pixels, 0, 0, dim);
    window.root = root;
    window.ctx = ctx;
    window.render = () => {
      ctx.clearRect(0,0,dim,dim);
    };
    this.setState({tree: root});
  }

  loadImage(newProps) {
    let props = newProps || this.props;
    $.cloudinary.config(window.c_o)
    let c_img = props.currentImage;
    let cloud_img = $.cloudinary.image(
      c_img.public_id,
      {
        crossOrigin: "Anonymous",
        width: c_img.dimension,
        height: c_img.dimension,
        crop: "scale",
      }
    )[0];

    cloud_img.onload = () => {
      let ctx = document.getElementById('tableau').getContext('2d')
      ctx.drawImage(
        cloud_img, 0,0
      );
      this.buildQuadTree(ctx, c_img.dimension);
    };

    let $canvas = $('#tableau');
    let canvas = $canvas[0];
    let ctx = document.getElementById('tableau').getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $canvas.attr('width', c_img.dimension).attr('height', c_img.dimension)
    this.setState({dimension: c_img.dimension, raw_img: cloud_img})
  }


  cloudUpdate (e) {
    e.preventDefault()
    cloudinary.openUploadWidget(window.c_o, (error, images) => {
      if (error === null) {
        let cloud_resp = images[0]
        let new_dimensions = 1

        while ((new_dimensions * 2) <= Math.min(cloud_resp.width, cloud_resp.height)) {
          new_dimensions *= 2
        }

        let submission = {
          user_id: Cookies.get('user_id'),
          dimension: new_dimensions,
          public_id: images[0].public_id
        }

        this.props.createImage(submission)

      }
    })
  }

  render () {
    return (
      <div>
        <div>And I am the showcase</div>
        <button onClick={this.cloudUpdate}>PRESS ME</button>
        <canvas id="tableau">Canvas is here</canvas>
      </div>
    )
  }
}

export default Showcase;
