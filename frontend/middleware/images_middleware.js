import {
  getAllImages,
  postImage
} from 'ImagesUtils'


import {
  CREATE_IMAGE,
  FETCH_ALL_IMAGES,
  receiveAllImages,
  receiveImage,
} from 'ImagesActions'


const ImagesMiddleware = ({dispatch}) => (next) => (action) => {
  let receiveImageSuccess = (image) => dispatch(receiveImage(image))
  let receiveAllImagesSuccess = (images) => dispatch(receiveAllImages(images))

  switch (action.type) {
    case FETCH_ALL_IMAGES:
      getAllImages(action.user, receiveAllImagesSuccess)
      return next(action) ;
      case CREATE_IMAGE:
      postImage(action.image, receiveImageSuccess)
      return next(action) ;
    default:
      return next(action);
  }
}


export default ImagesMiddleware
