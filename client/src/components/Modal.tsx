import React, { ChangeEvent, useEffect, useState } from 'react'
import { FiX } from 'react-icons/fi';
import { connect } from 'react-redux';
import api from '../services/api';
import { getToken, getUserId } from '../utils/getAttributes';
import { EditingPubliType, ModalType } from '../utils/types';
import Button from './Button';
import Input from './Input';


interface ModalI{
  show: boolean;
  setShow: (b:boolean)=>void;
  type:{entity:ModalType,action:ModalType};
  content?: number;
  question?: number;
  publiData?:EditingPubliType;
  token?: string;
  user?: number;
}

type publiData={
  title:string,
  text:string
}

const Modal = ({show,setShow,content,question,publiData,type,token,user}:ModalI)=>{
  const initialData = publiData ? {title:publiData.title,text:publiData.text} : {title:'',text:''};
  const [formData, setFormData] = useState<publiData>(initialData);
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

  const handleEditQuestion = async()=>{
    try {
      await api.put('question/edit/'+publiData?.id,
      {
        newTitle:formData.title,
        newText:formData.text
      },
      {
        headers:{
          authorization:'BEARER '+token
        }
      })

      alert('Pergunta editada com sucesso!');
      setShow(false)
    } catch (err) {
      alert('Erro ao editar questão!');
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

  const handleEditAnswer = async()=>{
    try {
      await api.patch('answer/edit/'+publiData?.id,
      {
        newText:formData.text,
      },
      {
        headers:{
          authorization:'BEARER '+token
        }
      })

      alert('Resposta editada com sucesso!');
      setShow(false)
    } catch (err) {
      alert('Erro ao editar resposta!')
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
    setFormData(initialData)
  //eslint-disable-next-line
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
          <h1 className="text-primaryDark text-4xl font-bold">{type.action === ModalType.mtaCreate ? 'Nova' : 'Editar'} {type.entity === ModalType.mteQuestion ? 'pergunta' : 'resposta'}</h1>
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
            action={type.action === ModalType.mtaCreate ?
              (type.entity === ModalType.mteQuestion ? handleCreateQuestion : handleCreateAnswer) :
              (type.entity === ModalType.mteQuestion ? handleEditQuestion : handleEditAnswer)}
            value={type.action === ModalType.mtaCreate ? (type.entity === ModalType.mteQuestion ? 'Perguntar' : 'Responder') : 'Editar'}
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
