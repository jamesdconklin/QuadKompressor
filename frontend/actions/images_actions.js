export const FETCH_ALL_IMAGES = 'FETCH_ALL_IMAGES'
export const RECEIVE_IMAGE = 'RECEIVE_IMAGE'
export const RECEIVE_ALL_IMAGES = 'RECEIVE_ALL_IMAGES'
export const CREATE_IMAGE = "CREATE_IMAGE"


export const fetchAllImages = (user) => ({
  type: FETCH_ALL_IMAGES,
  user
})

export const receiveImage = (image) => ({
  type: RECEIVE_IMAGE,
  image
})

export const receiveAllImages = (images) => ({
  type: RECEIVE_ALL_IMAGES,
  images
})

export const createImage = (image) => ({
  type: CREATE_IMAGE,
  image
})
