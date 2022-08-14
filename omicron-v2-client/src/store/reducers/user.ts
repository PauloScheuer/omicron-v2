import {Action, UserType} from '../../utils/types';
import {USER_EDITED, USER_LOGGED_IN,USER_LOGGED_OUT} from '../../utils/consts';

const initialState : UserType={
  name:'',
  email:'',
  level:0,
  id:0,
  token:''
}

const reducer = (state : UserType = initialState, action:Action)=>{
  switch(action.type){
    case USER_LOGGED_IN:
      return{
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        level:action.payload.level,
        id:action.payload.id,
        token:action.payload.token
      }
    case USER_LOGGED_OUT:
      return{
        ...state,
        name:initialState.name,
        email:initialState.email,
        level:initialState.level,
        id:initialState.id,
        token:initialState.token
      }
    case USER_EDITED:
      return{
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        level:action.payload.level,
      }
    default:
      return state
  }
}

export default reducer;