import React, { useState } from 'react'
import { FiArrowRight, FiEdit, FiHeart, FiX } from 'react-icons/fi';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import {getToken} from '../../utils/getAttributes';

interface QuestionI{
  title : string;
  text : string;
  when : Date;
  user : string;
  likes : number;
  id : number;
  hasLikedSt : boolean;
  hasCreated : boolean;
  postDelete : ()=>void;
  callEdit : ()=>void;
  alone?: boolean;
  token?: string
}

const Question = ({title,text,when,user,likes,id,hasLikedSt,hasCreated,postDelete,callEdit,alone=false,token}:QuestionI)=>{
  const [hasLiked, setHasLiked] = useState<boolean>(hasLikedSt);
  const [adaptLikes,setAdaptLikes] = useState<number>(likes);

  const handleLike = async ()=>{
    try {
      const res = await api.post('like/create',{
        type:'question',
        id
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

  const handleDislike = async ()=>{
    try {
      const res = await api.delete(`like/delete/${id}?type=question`,{
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

  const handleDeleteQuestion = async()=>{
    try {
     await api.delete('question/delete/'+id,{
      headers:{
        authorization:'BEARER '+token
      }
     })

      postDelete();
      alert('Publicação excluída');
    } catch (err) {
      alert('Erro ao excluir publicação!')
    }
  }

  return (
    <div className="relative bg-white rounded-lg flex-none md:px-16 px-8 py-10 mb-8">
      <div className="flex justify-between">
        <div className="mb-6">
          <h3 className="text-primaryDark font-bold text-3xl">{title}</h3>
          <span className="pl-4 text-sm font-medium text-primary">{new Date(when).toLocaleString()} por {user}</span>
        </div>
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
              onClick={handleDeleteQuestion}
            />
          </div>
        )}
      </div>
      <p className="">{text}</p>
      <div className="flex justify-between mt-8">
        <div className="flex">
          {token !== '' ?
          (
            hasLiked ? (
              <FiHeart className="text-primary cursor-pointer" size={24} onClick={()=>handleDislike()}/>
              ) : (
              <FiHeart className="text-dark cursor-pointer" size={24} onClick={()=>handleLike()}/>
            )
          ) :
            <FiHeart className="text-grey" size={24}/>
          }
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
