import { UserType } from "./types";

export default function getToken(user: UserType){
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