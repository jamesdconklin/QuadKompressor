import React, { PropTypes } from 'react'
import {CloudinaryImage, cloudinaryConfig} from 'react-cloudinary'
import Cookies from 'cookies-js'
import QTNode from 'QTNode'
import Gallery from 'Gallery'

class Showcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {dimension: 512, tree: null, raw_img: null, context: null, threshold: 300};
    this.cloudUpdate = this.cloudUpdate.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.playKompression = this.playKompression.bind(this);
    this.buildQuadTree = this.buildQuadTree.bind(this);
    this.changeThreshold = this.changeThreshold.bind(this);
    this.redrawTree = this.redrawTree.bind(this);
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

    if (nextProps.gallery.length && !this.props.currentImage) {
      this.props.sendImage(this.props.gallery[0])
    }
  }

  buildQuadTree(ctx, dim, threshold) {
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
    let root = new QTNode(pixels, 0, 0, dim, threshold);
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
        width: 512,
        height: 512,
        crop: "scale",
      }
    )[0];

    cloud_img.onload = () => {
      let ctx = document.getElementById('tableau').getContext('2d')
      ctx.drawImage(
        cloud_img, 0,0
      );
      this.buildQuadTree(ctx, 512, this.state.threshold);
    };

    let $canvas = $('#tableau');
    let canvas = $canvas[0];
    $canvas.attr('width', 512).attr('height', 512)
    let ctx = document.getElementById('tableau').getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.setState({raw_img: cloud_img, context: ctx})
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


  playKompression() {

    this.state.context.clearRect(0,0,this.state.dimension,this.state.dimension);
    this.state.tree.draw(this.state.context)

  }

  changeThreshold(e) {
    this.setState({threshold: e.target.value})
  }

  redrawTree() {
    this.state.context.drawImage(this.state.raw_img, 0, 0, 512, 512);
    this.buildQuadTree(this.state.context, 512, this.state.threshold);
  }


  render () {
    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-4'>
            <Gallery photos={this.props.gallery} sendImage={this.props.sendImage}/>
            <div className='row'>
              <button className="btn-primary action-button" onClick={this.cloudUpdate}>UPLOAD</button>
              <button className="btn-secondary action-button" onClick={this.playKompression}>PLAY</button>
              <input
                className='threshold'
                type='range'
                 min="50"
                 max="2500"
                 step="50"
                 value={this.state.threshold}
                 onChange={this.changeThreshold}
                 onMouseUp={this.redrawTree}/>

            </div>
          </div>


          <div className='col-lg-8'>
            <canvas id="tableau" className="center-block">Canvas is here</canvas>
          </div>

        </div>

        <div className='row'>
          <div className='col-lg-4'>

          </div>
          <div className='col-lg-8 sub-canvas-content'>
            <hr/>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </div>
        </div>

      </div>
    )
  }
}

export default Showcase;
