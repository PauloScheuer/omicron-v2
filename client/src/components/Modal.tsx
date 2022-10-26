import React, { ChangeEvent, useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi';
import { connect } from 'react-redux';
import api from '../services/api';
import { getToken, getUserId } from '../utils/getAttributes';
import { ModalType } from '../utils/types';
import Button from './Button';
import Input from './Input';

interface ModalI{
  show: boolean;
  setShow: (b:boolean)=>void;
  type:{entity:ModalType,action:ModalType};
  content?: number;
  question?: number;
  token?: string;
  user?: number;
}

type questionData={
  title:string,
  text:string
}

const Modal = ({show,setShow,content,question,type,token,user}:ModalI)=>{
  const [formData, setFormData] = useState<questionData>({title:'',text:''});
  const [sendEnabled, setSendEnabled] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>)=>{
    const {name,value} = event.target;
    setFormData({...formData,[name]:value})
  }

  const handleCreateQuestion = async ()=>{
    try {
      await api.post('question/create',
      {
        ...formData,
        user,
        content
      },
      {
        headers:{
          authorization:'BEARER '+token
        }
      })

      alert('Pergunta criada com sucesso!');
      setShow(false)
    } catch (err) {
      alert('Erro ao criar pergunta!')
    }
  }

  const handleCreateAnswer = async()=>{
    try {
      await api.post('answer/create',
      {
        text:formData.text,
        user,
        question
      },
      {
        headers:{
          authorization:'BEARER '+token
        }
      })

      alert('Resposta criada com sucesso!');
      setShow(false)
    } catch (err) {
      alert('Erro ao criar resposta!')
    }
  }

  useEffect(()=>{
    if((formData.text.length < 1) || ((type.entity === ModalType.mteQuestion) && (formData.title.length < 1))){
      setSendEnabled(false);
    }else{
      setSendEnabled(true)
    }
  //eslint-disable-next-line
  },[formData]);

  useEffect(()=>{
    setFormData({title:'',text:''})
  },[show]);

  return (
    <div 
      className={`w-screen h-screen fixed top-0 left-0 bg-secundary z-30 p-10 transition-[visibility,opacity] duration-300 
                ${show ? 'visible opacity-100' : 'invisible opacity-0'}`}>
      <div className="relative bg-white rounded w-full h-full overflow-hidden">
        <FiX
          className="absolute right-5 top-5 cursor-pointer text-primaryDark" 
          onClick={()=>setShow(!show)}
          size={32}
        />
        <div className="flex flex-col pt-24 items-center">
          <h1 className="text-primaryDark text-4xl font-bold">Nova {type.entity === ModalType.mteQuestion ? 'pergunta' : 'resposta'}</h1>
          {type.entity === ModalType.mteQuestion && (
            <Input
            name="title" 
            placeholder="Título da pergunta"
            value={formData.title}
            setValue={handleInputChange}
            style={`mt-8 w-56`}
            />
          )}
          <Input
            name="text"
            placeholder=""
            value={formData.text}
            setValue={handleInputChange}
            style={`mt-8 w-56 h-60 sm:h-40`}
            type="textarea"
          />
          <Button 
            action={type.entity === ModalType.mteQuestion ? handleCreateQuestion : handleCreateAnswer}
            value={type.entity === ModalType.mteQuestion ? 'Perguntar' : 'Responder'}
            enabled={sendEnabled}
            style={`mt-8`}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state:any)=>{
  return{
    token: getToken(state.user),
    user: getUserId(state.user)
  }
};

export default connect(mapStateToProps,null)(Modal)
