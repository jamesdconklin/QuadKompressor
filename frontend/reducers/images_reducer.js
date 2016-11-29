import {
  RECEIVE_IMAGE,
  RECEIVE_ALL_IMAGES
} from 'ImagesActions'

import { merge } from 'lodash'

const defaultState = {
  currentImage: {public_id: 'lgntvqchmmcehqrvuxd3', dimension: 512},
  gallery: {}
}

const ImagesReducer = (state = defaultState, action) => {
Object.freeze(state)
  switch (action.type) {
    case RECEIVE_IMAGE:
      return merge({}, state, {currentImage: action.image});
    case RECEIVE_ALL_IMAGES:
      return merge({}, state, {gallery: action.images});
    default:
      return state;
  }
}


export default ImagesReducer
