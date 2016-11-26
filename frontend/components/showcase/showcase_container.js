import { connect } from 'react-redux';
import Showcase from 'ShowcaseComponent';
import { fetchAllImages, createImage } from 'ImagesActions';

const mapStateToProps = ({images, user}) => ({
  gallery: images.gallery,
  currentImage: images.currentImage,
  user
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllImages: (user) => dispatch(fetchAllImages(user)),
  createImage: (image) => dispatch(createImage(image))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Showcase);
