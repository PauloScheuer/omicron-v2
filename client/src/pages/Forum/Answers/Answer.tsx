import React, { useState } from 'react'
import {  FiEdit, FiHeart, FiX } from 'react-icons/fi';
import { connect } from 'react-redux';
import api from '../../../services/api';
import {getToken} from '../../../utils/getAttributes';

interface AnswerI{
  text : string;
  when : Date;
  user : string;
  likes : number;
  id : number;
  hasLikedSt : boolean;
  hasCreated : boolean;
  postDelete : ()=>void;
  callEdit : ()=>void;
  token ?: string;
}

const Answer = ({text,when,user,likes,id,hasLikedSt,hasCreated,postDelete,callEdit,token}:AnswerI)=>{
  const [hasLiked, setHasLiked] = useState<boolean>(hasLikedSt);
  const [adaptLikes, setAdaptLikes] = useState<number>(likes);

  const handleLike = async()=>{
    try {
      const res = await api.post('like/create',{
        type:'answer',
        id,
      },{
        headers:{
          authorization:'BEARER '+token
        }
      })

      setHasLiked(true);
      setAdaptLikes(res.data.newCount);
    } catch (err) {
      alert('Erro ao curtir publicação!')
    }
  }

  const handleDislike = async()=>{
    try {
      const res = await api.delete(`like/delete/${id}?type=answer`,{
        headers:{
          authorization:'BEARER '+token
        }
      })

      setHasLiked(false);
      setAdaptLikes(res.data.newCount);
    } catch (err) {
      alert('Erro ao descurtir publicação!')
    }
  }

  const handleDeleteAnswer = async()=>{
    try {
      await api.delete('answer/delete/'+id,{
        headers:{
          authorization:'BEARER '+token
        }
      });

      postDelete();
      alert('Resposta excluída!');
    } catch (err) {
      alert('Erro ao excluir resposta');
    }
  }

  return (
    <div className="bg-white rounded-lg flex-none md:px-10 px-6 py-6 mb-6">
      <div className="mb-4 flex justify-between">
        <span className="text-sm font-medium text-primary">{new Date(when).toLocaleString()} por {user}</span>
          {hasCreated && (
            <div className="flex">
              <FiEdit
                className="text-dark hover:text-good cursor-pointer mr-4"
                size={24}
                onClick={callEdit}
              />
              <FiX
              className="text-dark hover:text-bad cursor-pointer"
              size={24}
              onClick={handleDeleteAnswer}
              />
            </div>
          )}
      </div>
      <p className="text-sm">{text}</p>
      <div className="flex justify-between mt-4">
        <div className="flex">
          {token !== '' ? (
            hasLiked ?
            <FiHeart className="text-primary cursor-pointer" size={24} onClick={()=>handleDislike()}/> :
            <FiHeart className="text-dark cursor-pointer" size={24} onClick={()=>handleLike()}/>
          ) :
            <FiHeart className="text-grey" size={24}/>}
          <span className="font-medium ml-2">{adaptLikes}</span>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state:any)=>{
  return{token:getToken(state.user)}
}

export default connect(mapStateToProps,null)(Answer);
