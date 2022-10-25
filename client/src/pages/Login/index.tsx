import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import loginImage from '../../assets/images/login.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';
import { emailRegex } from '../../utils/emailRegex';
import {connect} from 'react-redux';
import {login} from '../../store/actions/user';
import {UserType, Action} from '../../utils/types';

interface LoginDataI{
  emailUser: string;
  keyUser: string;
}

const Login = (props:any) => {
  const [sendEnabled, setSendEnabled] = useState<boolean>(false);
  const [data, setData] = useState<LoginDataI>({
    emailUser: '',
    keyUser:''
  });

  const history = useHistory();

  const handleDataChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>)=>{
    const { name, value } = event.target;
    setData({ ...data, [name]: value });
  }

  const handleLogin = async()=>{
    try {
      const result = await api.post('user/login', data);
      if (result.status !== 200) {
        alert('Erro no login. Tente novamente');
        return;
      }

      alert(result.data.message);
      props.onLogin({
        token:result.data.token,
        name:result.data.nameUser,
        email:result.data.emailUser,
        level:result.data.levelUser,
        id:result.data.idUser
      })
      history.push('/');
    } catch (err) {
      alert(
        'Erro no login. Revise o e-mail e a senha informados.'
      );
    }
  }

  useEffect(()=>{
    if ((data.keyUser.length>0) && emailRegex.test(data.emailUser)){
      setSendEnabled(true);
    }else{
      setSendEnabled(false);
    }
  },[data]);

  return (
    <div className="flex h-screen lg:justify-between justify-center items-center box-border px-32">
      <form className="bg-white py-20 md:px-24 px-10 flex flex-col rounded-xl items-center relative shadow-primary">
        <div className="flex items-center justify-between w-full">
          <Link to="/">
            <FiArrowLeft
              className="text-primaryDark "
              size={32}
              />
          </Link>
          <h1 className="font-semibold text-4xl text-primaryDark ">Login</h1>
          <span className="w-8"></span>
        </div>
        <Input placeholder='Email' name="emailUser" value={data.emailUser} setValue={event=>handleDataChange(event)} style={`w-64 mt-12`} type="email"/>
        <Input placeholder='Senha' name="keyUser" value={data.keyUser} setValue={event=>handleDataChange(event)} style={`w-64 mt-8 mb-2`} type="password"/>
        {/* <div className="flex justify-end w-full">
          <Link to="/">
            <span className="text-primaryDark text-sm font-medium">
              Esqueci a senha
            </span>
          </Link>
        </div> */}
        <Button value="Entrar" action={handleLogin} style={`mt-12`} enabled={sendEnabled}/>
        <Link to="/cadastro">
          <span className="absolute right-0 -bottom-8 text-primaryDark font-medium">
            Ir para o cadastro
          </span>
        </Link>
      </form>
      <img src={loginImage} alt="" className="w-1/2 hidden lg:block" />
    </div>
  );
}

const mapDispatchToProps = (dispatch:Dispatch<Action>) =>{
  return{
    onLogin: (user:UserType) => {
      localStorage.setItem('token',user.token);
      localStorage.setItem('userId',String(user.id));
      dispatch(login(user))
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)
