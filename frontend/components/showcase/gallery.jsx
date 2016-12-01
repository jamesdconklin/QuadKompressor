import React, { PropTypes } from 'react'
import Masonry from 'react-masonry-component'
import {CloudinaryImage, cloudinaryConfig} from 'react-cloudinary'


const masonryOptions = {
  transitionDuration: 0
}

const masonryStyle = {
  backgroundColor: 'inherit'
};

class Gallery extends React.Component {
  constructor(props){
   super(props)


  }

  imageTile(imageDetail) {
    cloudinaryConfig(window.c_o)
    let cloud_opts = {
      crossOrigin: "Anonymous",
      width: 128,
      height: 128,
      crop: "scale"
    };
    return (
      <li key={imageDetail.public_id}>
        <CloudinaryImage publicId={imageDetail.public_id} options={cloud_opts}
                         onClick={e => this.props.sendImage(imageDetail)}/>
      </li>
    );
  }


  render () {

    return (
      <div id='gallery-container'>
        <Masonry
          className={'my-class-name'}
          elementType={'ul'}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
          style={masonryStyle}
          >
          {
            this.props.photos.map(this.imageTile.bind(this))
          }
        </Masonry>
      </div>
    );
  }
}

export default Gallery;
