import React, { ChangeEvent, Dispatch, useEffect, useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Layout from '../../components/Layout';
import {connect} from 'react-redux';
import api from '../../services/api';
import { emailRegex } from '../../utils/emailRegex';
import { scholarityOptions } from '../../utils/consts';
import { Action, UserType } from '../../utils/types';
import { edit, login } from '../../store/actions/user';
import {getToken} from '../../utils/getAttributes';
import { useHistory } from 'react-router-dom';

interface ProfileI{
  name:string,
  email:string,
  level:number,
  key:string
}

interface AuthI{
  currentKey:string,
  newKey:string,
  confirmNewKey:string
}

const Userpage = (props:any) => {
  const [sendProfileEnabled,setSendProfileEnabled] = useState<boolean>(false);
  const [sendAuthEnabled,setSendAuthEnabled] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileI>({
    name:props.name,
    email:props.email,
    level:props.level,
    key:''
  });
  const [authData, setAuthData] = useState<AuthI>({
    currentKey:'',
    newKey:'',
    confirmNewKey:''
  });

  const history = useHistory();

  const handleProfileDataChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
    const { name, value } = event.target;
    setProfileData({ ...profileData, [name]: value });
  }

  const handleAuthDataChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
    const { name, value } = event.target;
    setAuthData({ ...authData, [name]: value });
  }

  const handleEditProfile = async()=>{
    try {
      const dataToSend = {
        newEmail : profileData.email,
        newName : profileData.name,
        newLevel : profileData.level
      }

      const result = await api.put('user/edit/'+props.id, dataToSend, {
        headers: {
          authorization: 'BEARER ' + props.token,
        },
      });
      if (result.status !== 200) {
        alert('Erro na edição do perfil. Tente novamente');
        return;
      }

      alert(result.data.message);
      props.onEdit({
        name:result.data.user.nameUser,
        email:result.data.user.emailUser,
        level:result.data.user.levelUser,
      })

      setProfileData({...profileData,key:''});

    } catch (err) {
      alert(
        'Erro na edição. Revise a senha informada.'
      );
    }
  }

  const handleEditAuth = async()=>{
    try {
      const dataToSend = {
        oldKey : authData.currentKey,
        newKey : authData.newKey,
      }

      const result = await api.patch('user/edit-key/'+props.id, dataToSend, {
        headers: {
          authorization: 'BEARER ' + props.token,
        },
      });
      if (result.status !== 200) {
        alert('Erro na edição da senha. Tente novamente');
        return;
      }

      alert(result.data.message);

      setAuthData({currentKey:'',newKey:'',confirmNewKey:''});

    } catch (err) {
      alert(
        'Erro na edição. Revise a senha informada.'
      );
    }
  }

  useEffect(()=>{
    if ((profileData.key.length>0) && emailRegex.test(profileData.email)){
      setSendProfileEnabled(true);
    }else{
      setSendProfileEnabled(false);
    }
  },[profileData]);

  useEffect(()=>{
    if ((authData.currentKey.length>0) && (authData.newKey.length>0) && (authData.newKey===authData.confirmNewKey)){
      setSendAuthEnabled(true);
    }else{
      setSendAuthEnabled(false);
    }
  },[authData]);

  useEffect(()=>{
    checkData();
    // eslint-disable-next-line
  },[]);

  const checkData = async()=>{
    const needLogin = 'Você precisa estar logado para acessar essa página';
    if(props.token === ''){
      alert(needLogin);
      history.push('/login')
    }else if(props.email === ''){
      const result = await api.get('user/show',{
        headers:{
          authorization: 'BEARER '+props.token
        }
      });

      if (result.status !== 200){
        alert(needLogin);
        history.push('/login');
        return;
      }

      setProfileData({
        ...profileData,
        name:result.data.user.nameUser,
        email:result.data.user.emailUser,
        level:result.data.user.levelUser,
      })

      props.onReceiveData({
        name:result.data.user.nameUser,
        email:result.data.user.emailUser,
        level:result.data.user.levelUser,
        id:result.data.user.idUser
      })
    }
  }

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row justify-center lg:justify-between md:px-32 px-10 py-20 lg:items-baseline">
        <form className="bg-white pt-20  md:px-24 px-10 flex flex-col rounded-xl items-center">
          <h1 className="font-semibold text-4xl text-primaryDark">Editar dados</h1>
          <Input placeholder='Nome' name="name" value={profileData.name} setValue={event=>handleProfileDataChange(event)} style={`w-64 mt-8`}/>
          <Input placeholder='Email' name="email" value={profileData.email} setValue={event=>handleProfileDataChange(event)} style={`w-64 mt-4`} type="email"/>
          <Input placeholder='Escolaridade' name="level" style={`w-64 mt-4`} type="select" value={profileData.level} options={scholarityOptions} setValue={event=>handleProfileDataChange(event)}/>
          <Input placeholder='Insira sua senha' name="key" value={profileData.key} setValue={event=>handleProfileDataChange(event)} style={`w-64 mt-4`} type="password"/>
          <Button value="Editar" action={handleEditProfile} style={`my-8 bg-primary`} enabled={sendProfileEnabled}/>
        </form>
        <form className="bg-white pt-20 mt-10 lg:mt-0 ml-0 lg:ml-10 md:px-24 px-10 flex flex-col rounded-xl items-center">
          <h1 className="font-semibold text-4xl text-primaryDark">Editar senha</h1>
          <Input placeholder='Senha atual' name="currentKey" value={authData.currentKey} setValue={event=>handleAuthDataChange(event)} style={`w-64 mt-8`} type="password"/>
          <Input placeholder='Nova senha' name="newKey" value={authData.newKey} setValue={event=>handleAuthDataChange(event)} style={`w-64 mt-4`} type="password"/>
          <Input placeholder='Confirme a nova senha' name="confirmNewKey" value={authData.confirmNewKey} setValue={event=>handleAuthDataChange(event)} style={`w-64 mt-4`} type="password"/>
          <Button value="Editar" action={handleEditAuth} style={`my-8 bg-primary`} enabled={sendAuthEnabled}/>
        </form>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state:any)=>{
  return{
    email: state.user.email,
    name: state.user.name,
    level: state.user.level,
    id: state.user.id,
    token: getToken(state.user)
  }
}

const mapDispatchToProps = (dispatch:Dispatch<Action>) =>{
  return{
    onEdit: (user:UserType) => dispatch(edit(user)),
    onReceiveData: (user:UserType) => dispatch(login(user))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Userpage);
