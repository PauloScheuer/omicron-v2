import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';
import Layout from '../../components/Layout';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Filters from './Filters';
import { KindOrderType, ParamOrderType, QuestionType } from '../../utils/types';
import Question from './Question';
import Pagination from './Pagination';
import { getUserId } from '../../utils/getAttributes';
import Modal from '../../components/Modal';

interface ForumI{
  userId:number;
}

const Forum = ({userId}:ForumI) => {
  const [paramOrder, setParamOrder] = useState<ParamOrderType>(ParamOrderType.date);
  const [kindOrder, setKindOrder] = useState<KindOrderType>(KindOrderType.desc);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage,setMaxPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false)
  const minPage = 1;

  const { index } = useParams();

  useEffect(()=>{
    handleSearchQuestions(page);
  /* eslint-disable-next-line */
  },[page]);

  useEffect(()=>{
    if(!showModal){
      handleSearchQuestions(page)
    }
  },[showModal])

  useEffect(()=>{
    if(showModal){
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = 'auto'
    }
  },[showModal]);

  const handleSearchQuestions = async(searchPage:number)=>{
    try{
      const res = await api.get(`/question/index/?page=${searchPage}&content=${index}&order=${paramOrder}&by=${kindOrder}&user=${userId}`);
      setQuestions(res.data.questions);
      setMaxPage(res.data.pages);
      if (searchPage !== page){
        setPage(searchPage)
      }
    }catch(err){
      alert('Não foi possível realizar a busca!');
    }
  }

  return(
    <Layout>
      <Modal show={showModal} setShow={(b:boolean)=>setShowModal(b)} content={index}/>
      <div className="md:px-32 px-10 py-20">
        <Link to="/forum">
          <div className="flex items-center">
            <FiArrowLeft
              className="text-primaryDark"
              
              size={20}
              />
            <span className="text-primary font-medium">Voltar para listagem</span>
          </div>
        </Link>
        <h1 className="text-secundary text-4xl font-bold mt-6">Fórum sobre conteúdo</h1>
        <div
          className="flex justify-center items-center bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white transition duration-300 rounded w-min p-3 mt-4 cursor-pointer"
          onClick={()=>setShowModal(!showModal)}
        >
          <FiPlus size={20}/>
          <span className="whitespace-nowrap font-bold ml-2">Nova pergunta</span>
        </div>
        <Filters 
          paramOrder={paramOrder} 
          kindOrder={kindOrder} 
          setParamOrder={(i:ParamOrderType)=>setParamOrder(i)} 
          setKindOrder={(i:KindOrderType)=>setKindOrder(i)}
          pagination={<Pagination min={minPage} max={maxPage} setPage={setPage} page={page}/>}
          action={handleSearchQuestions}
        />
        <div className="flex flex-col mt-12">
          {questions.map(q=>{
            return <Question title={q.title} text={q.text} when={q.when} user={q.user} id={q.id} likes={q.likes} hasLikedSt={q.hasLiked} key={q.id}/>
          })}
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-end">
          <Pagination min={minPage} max={maxPage} setPage={setPage} page={page}/>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state:any)=>{
  return{userId:getUserId(state.user)}
}

export default connect(mapStateToProps,null)(Forum);
