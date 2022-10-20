import React, { useState } from 'react'
import {  FiHeart } from 'react-icons/fi';
import { connect } from 'react-redux';
import api from '../../../services/api';
import {getToken} from '../../../utils/getAttributes';

interface AnswerI{
  text : string;
  when : Date;
  user : string;
  likes : number;
  id : number;
  idLikeSt : number;
  token ?: string;
}

const Answer = ({text,when,user,likes,id,idLikeSt,token}:AnswerI)=>{
  const [idLike, setIdLike] = useState<number>(idLikeSt);
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

      setIdLike(res.data.id);
      setAdaptLikes(res.data.newCount);
    } catch (err) {
      alert('Erro ao curtir publicação!')
    }
  }

  const handleDislike = async()=>{
    try {
      const res = await api.delete('like/delete/'+idLike,{
        headers:{
          authorization:'BEARER '+token
        }
      })

      setIdLike(-1);
      setAdaptLikes(res.data.newCount);
    } catch (err) {
      alert('Erro ao descurtir publicação!')
    }
  }

  return (
    <div className="bg-white rounded-lg flex-none md:px-10 px-6 py-6 mb-6">
      <div className="mb-4">
        <span className="text-sm font-medium text-primary">{new Date(when).toLocaleString()} por {user}</span>
      </div>
      <p className="text-sm">{text}</p>
      <div className="flex justify-between mt-4">
        <div className="flex">
          {token !== '' ? (
            idLike === -1 ?
            <FiHeart className="text-dark cursor-pointer" size={24} onClick={()=>handleLike()}/> :
            <FiHeart className="text-primary cursor-pointer" size={24} onClick={()=>handleDislike()}/>
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
