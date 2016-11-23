import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
import configureStore from './store/store';

import {getAllImages, postImage} from 'ImagesUtils'

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();

  window.getAll = getAllImages
  window.postImage = postImage

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
