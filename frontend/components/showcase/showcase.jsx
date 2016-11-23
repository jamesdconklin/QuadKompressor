import React, { PropTypes } from 'react'


class Showcase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.cloudUpdate = this.cloudUpdate.bind(this);
  }


  cloudUpdate (e) {
    e.preventDefault()
    cloudinary.openUploadWidget(window.c_o, (error, images) => {
      if (error === null) {
        debugger
        this.setState({picture_url: images[0].url})
        // $('.upload-container').css("background-image", `url(${this.state.picture_url})`)
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
