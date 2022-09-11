import React, { useState } from 'react'
import { FiArrowRight, FiHeart } from 'react-icons/fi';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import getToken from '../../utils/getToken';

interface QuestionI{
  title : string;
  text : string;
  when : Date;
  user : string;
  likes : number;
  id : number;
  idLikeSt : number;
  alone?: boolean;
  token?: string
}

const Question = ({title,text,when,user,likes,id,idLikeSt,alone=false,token}:QuestionI)=>{
  const [idLike, setIdLike] = useState<number>(idLikeSt);
  const [adaptLikes,setAdaptLikes] = useState<number>(likes);

  const handleLike = async ()=>{
    try {
      const res = await api.post('like/create',{
        type:'question',
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

  const handleDislike = async ()=>{
    try {
      const res = await api.delete('like/delete/'+idLike,{
        headers:{
          authorization:'BEARER '+token
        }
      })
      setIdLike(-1);
      setAdaptLikes(res.data.newCount);
    } catch (err) {
      alert('Erro ao curtir publicação!')
    }
  }

  return (
    <div className="bg-white rounded-lg flex-none md:px-16 px-8 py-10 mb-8">
      <div className="mb-6">
        <h3 className="text-primaryDark font-bold text-3xl">{title}</h3>
        <span className="pl-4 text-sm font-medium text-primary">{new Date(when).toLocaleString()} por {user}</span>
      </div>
      <p className="">{text}</p>
      <div className="flex justify-between mt-8">
        <div className="flex">
          {idLike === -1 ? (
            <FiHeart className="text-dark cursor-pointer" size={24} onClick={()=>handleLike()}/>
          ) : (
            <FiHeart className="text-primary cursor-pointer" size={24} onClick={()=>handleDislike()}/>
          )}
          <span className="font-medium ml-2">{adaptLikes}</span>
        </div>
        {!alone && (
          <Link to={'/forum/respostas/'+id} className="flex">
            <span className="font-medium">Ver respostas</span>
            <FiArrowRight className="text-secundary ml-2" size={24}/>
          </Link>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = (state:any)=>{
  return{token: getToken(state.user)}
}

export default connect(mapStateToProps,null)(Question);
