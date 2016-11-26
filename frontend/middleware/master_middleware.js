import { applyMiddleware, compose } from 'redux';
import ImagesMiddleware from 'ImagesMiddleware'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const masterMiddleware = composeEnhancers(
  applyMiddleware(
    ImagesMiddleware
));

export default masterMiddleware;
