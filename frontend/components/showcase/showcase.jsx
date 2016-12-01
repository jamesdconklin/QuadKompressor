import React, { PropTypes } from 'react'
import {CloudinaryImage, cloudinaryConfig} from 'react-cloudinary'
import {Link, hashHistory} from 'react-router';
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
        <div className="row header-row">
          <div className='col-lg-12 step text-center'>
            <h1 className='title-text'><Link to='/'>QT-Kompressor</Link></h1>
          </div>
        </div>

        <div className='row step'>
          <div className='col-lg-4'>
            <Gallery photos={this.props.gallery} sendImage={this.props.sendImage}/>
          </div>


          <div className='col-lg-8 canvas-container'>
            <canvas id="tableau" className="center-block">Canvas is here</canvas>
          </div>

        </div>

        <div className='row'>
          <div className='col-lg-4'>

          </div>
          <div className='col-lg-8 sub-canvas-content'>
            <hr/>
            <div className='row'>
              <div className='col-lg-4 text-center'>
                <button className="button flatbutton action-button" onClick={this.cloudUpdate}>UPLOAD</button>
              </div>
              <div className='col-lg-4 text-center'>
                <button className="button flatbutton action-button" onClick={this.playKompression}>PLAY</button>
              </div>
              <div className='col-lg-4 text-center'>
                <input
                  className='threshold'
                  type='range'
                   min="50"
                   max="2500"
                   step="50"
                   value={this.state.threshold}
                   onChange={this.changeThreshold}
                   onMouseUp={this.redrawTree}/>
                 <span className="threshold-text">{this.state.threshold}</span>
              </div>

            </div>

            <div className='row step'>
              <div className='col-lg-12'>
                <p className="instructions">
                  Upload your own photo with the Upload button. Your photos
                  will be saved and accessible on further visits from your
                  browser. Hit play, and QTKompressor will reconstruct your
                  image based on the current threshold. This threshold can
                  be adjusted with the slider. A higher threshold yields
                  more compressed, boxier images, and a lower threshold will
                  be more faithful to the original.
                </p>
              </div>
            </div>


          </div>
        </div>

      </div>
    )
  }
}

export default Showcase;
