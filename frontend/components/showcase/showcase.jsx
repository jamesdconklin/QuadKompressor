import React, { PropTypes } from 'react'
import {CloudinaryImage, cloudinaryConfig} from 'react-cloudinary'
import Cookies from 'cookies-js'


class Showcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.cloudUpdate = this.cloudUpdate.bind(this);
  }

  componentDidMount() {
    cloudinaryConfig(window.c_o)
    this.props.fetchAllImages(Cookies.get('user_id'))
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
      </div>
    )
  }
}

export default Showcase;
