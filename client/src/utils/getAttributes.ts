import { UserType } from "./types";

const getToken = (user: UserType)=>{
  let token = ''
  if (user.token !== ''){
    token = user.token;
  }else{
    const lsToken = localStorage.getItem('token');
    if (typeof lsToken === 'string'){
      token = lsToken;
    }
  }

  return token;
}

const getUserId = (user: UserType)=>{
  let userId = 0;
  if (user.id !== 0){
    userId = user.id;
  }else{
    const lsId = localStorage.getItem('userId');
    if (typeof lsId === 'string'){
      userId = Number(lsId);
    }
  }

  return userId;
}

export {getToken,getUserId}