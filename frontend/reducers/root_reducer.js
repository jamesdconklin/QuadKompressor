import { combineReducers } from 'redux';
import UserReducer from 'UserReducer'
import ImagesReducer from 'ImagesReducer'

const RootReducer = combineReducers({
  user: UserReducer,
  images: ImagesReducer
});

export default RootReducer;
