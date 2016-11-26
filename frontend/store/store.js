import { createStore } from 'redux';
import RootReducer from 'RootReducer';
import masterMiddleware from 'MasterMiddleware';

const configureStore = (preloadedState = {}) => (
  createStore(
    RootReducer,
    preloadedState,
    masterMiddleware
  )
);

export default configureStore;
