import {UserType, Action} from '../../utils/types';
import {USER_LOGGED_IN, USER_LOGGED_OUT, USER_EDITED} from '../../utils/consts';

export const login = (user:UserType) : Action=>{
  return{
    type: USER_LOGGED_IN,
    payload: user,
  }
}

export const edit = (user:UserType) : Action=>{
  return{
    type: USER_EDITED,
    payload: user,
  }
}

export const logout = ()=>{
  return{
    type: USER_LOGGED_OUT
  }
}
