import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'Root';
import configureStore from 'Store';

import {getAllImages, postImage} from 'ImagesUtils'

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();

  window.getAll = getAllImages
  window.postImage = postImage

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
