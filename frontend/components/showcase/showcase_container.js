import { connect } from 'react-redux';
import Showcase from 'ShowcaseComponent';
import { fetchAllImages, createImage, receiveImage } from 'ImagesActions';

const mapStateToProps = ({images, user}) => ({
  gallery: images.gallery,
  currentImage: images.currentImage,
  user
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllImages: (user) => dispatch(fetchAllImages(user)),
  createImage: (image) => dispatch(createImage(image)),
  sendImage: (image) => dispatch(receiveImage(image))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Showcase);
