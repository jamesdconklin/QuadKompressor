import React from 'react';
import ReactDOM from 'react-dom';

import Root from 'Root';
import configureStore from 'Store';

import {getAllImages, postImage} from 'ImagesUtils'
import Cookies from 'cookies-js'

const cookieConfig = () => {
  let user_id = Cookies.get('user_id')

  if (user_id) { return user_id }

    let alphabet = (
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"
    );
    user_id = ""
    while (user_id.length < 64) {
      user_id += alphabet[Math.floor(Math.random() * alphabet.length)]
    }
  Cookies.set('user_id', user_id)
  return user_id
}


document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();

  cookieConfig()

  window.getAll = getAllImages
  window.postImage = postImage

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} />, root);
});
