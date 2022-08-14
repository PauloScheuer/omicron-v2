import React, { ChangeEvent, useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import registerImage from '../../assets/images/register.svg';
import Button from '../../components/Button';
import Input from '../../components/Input';
import api from '../../services/api';
import { scholarityOptions } from '../../utils/consts';
import {emailRegex} from '../../utils/emailRegex';

interface RegisterDataI{
  email: string;
  name: string;
  level: number;
  key: string;
}

export default function Register() {
  const [sendEnabled, setSendEnabled] = useState<boolean>(false);
  const [data, setData] = useState<RegisterDataI>({
    email: '',
    name:'',
    level:-1,
    key:''
  });

  const history = useHistory();

  const handleDataChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
    const { name, value } = event.target;
    if (name === 'level') {
      setData({ ...data, [name]: Number(value) });
    }else{
      setData({ ...data, [name]: value });
    }
  }

  const handleSubmit = async()=>{
    try {
      const result = await api.post('user/create', data);
      if (result.status !== 200) {
        return;
      }

      alert(result.data.message);
      history.push('/login');
    } catch (err) {
      alert(
        'Erro no cadastro. Tente usar outro email ou aguarde alguns minutos e tente novamente.'
      );
    }
  }

  useEffect(()=>{
    if ((Number(data.level) !== -1) && (data.name.length>0) && (data.key.length>0) && emailRegex.test(data.email)){
      setSendEnabled(true);
    }else{
      setSendEnabled(false);
    }
  },[data]);

  return (
    <div className="flex h-screen lg:justify-between justify-center items-center box-border px-32 bg-primary">
      <img src={registerImage} className="w-1/3 hidden lg:block" alt=""/>
      <form className="bg-white py-10 md:px-24 px-10 flex flex-col rounded-xl items-center relative shadow-secundary">
        <div className="flex items-center justify-between w-full mt-4">
          <Link to="/">
            <FiArrowLeft
              className="text-secundary"
              size={32}
            />
          </Link>
          <h1 className="font-semibold text-4xl text-primaryDark">Cadastro</h1>
          <span className="w-8"></span>
        </div>
        <Input placeholder='Email' name="email" style={`w-64 mt-12`} type="email" value={data.email} setValue={event=>handleDataChange(event)}/>
        <Input placeholder='Nome' name="name" style={`w-64 mt-4`} value={data.name} setValue={event=>handleDataChange(event)}/>
        <Input placeholder='Escolaridade' name="level" style={`w-64 mt-4`} type="select" value={data.level} options={scholarityOptions} setValue={event=>handleDataChange(event)}/>
        <Input placeholder='Senha' name="key" style={`w-64 mt-4`} type="password" value={data.key} setValue={event=>handleDataChange(event)}/>
        <Button value="Avançar" style={`mt-12`} enabled={sendEnabled} color={2} action={handleSubmit}/>
        <Link to="/login">
          <span className="absolute right-0 -bottom-8 text-white font-medium">
            Ir para o login
          </span>
        </Link>
      </form>
    </div>
  );
}
