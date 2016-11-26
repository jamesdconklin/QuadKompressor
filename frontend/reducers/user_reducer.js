import { RECEIVE_USER } from 'UserActions'

import { merge } from 'lodash'


const UserReducer = (state = {user: ""}, action) => {
Object.freeze(state)
  switch (action.type) {
    case RECEIVE_USER:
      return merge({}, state, {user: action.user});
    default:
      return state;
  }
}



export default UserReducer
