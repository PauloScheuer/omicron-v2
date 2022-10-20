import React, { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory, useParams } from 'react-router-dom'
import Layout from '../../../components/Layout'
import api from '../../../services/api'
import {connect} from 'react-redux'
import { AnswerType, KindOrderType, ParamOrderType, QuestionType } from '../../../utils/types'
import Filters from '../Filters'
import Pagination from '../Pagination'
import Question from '../Question'
import Answer from './Answer'
import { getUserId } from '../../../utils/getAttributes'

interface AnswersI{
  userId:number;
}

const Answers = ({userId}:AnswersI) => {
  const [paramOrder, setParamOrder] = useState<ParamOrderType>(ParamOrderType.date);
  const [kindOrder, setKindOrder] = useState<KindOrderType>(KindOrderType.desc);
  const [question, setQuestion] = useState<QuestionType>();
  const [page, setPage] = useState<number>(1);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [maxPage, setMaxPage] = useState<number>(1);

  const minPage = 1;

  const {id} = useParams()
  const history= useHistory();

  useEffect(()=>{
    const handleSearchQuestion = async ()=>{
      try{
        const idUser = 1;
        const res = await api.get(`question/show/${id}?user=${idUser}`);
        setQuestion(res.data.question);

      }catch(err){
        alert('Erro ao carregar a página!');
        history.goBack();
      }
    }

    handleSearchQuestion();
    /* eslint-disable-next-line */
  },[])


  useEffect(()=>{
    handleSearchAnswers(page);
    /* eslint-disable-next-line */
  },[page])

  const handleSearchAnswers = async(searchPage:number)=>{
    try{
      const res = await api.get(`answer/index/${id}?page=${searchPage}&order=${paramOrder}&by=${kindOrder}&user=${userId}`);
      setAnswers(res.data.answers);
      setMaxPage(res.data.pages);
      if (searchPage !== page){
        setPage(searchPage)
      }
    }catch(err){
      alert('Não foi possível listar as respostas');
      setAnswers([]);
    }
  }

  return (
    <Layout>
      <div className="md:px-32 px-10 py-20">
        <div className="mb-6 cursor-pointer">
          <div className="flex items-center" onClick={()=>history.goBack()}>
            <FiArrowLeft
              className="text-primaryDark"

              size={20}
              />
            <span className="text-primary font-medium">Voltar para perguntas</span>
          </div>
        </div>
        {question && (
          <Question title={question.title} text={question.text} when={question.when} user={question.user} likes={question.likes} id={question.id} idLikeSt={question.idLike} alone={true}/>
        )}
        <h1 className="text-secundary text-3xl font-bold">Respostas:</h1>
        <Filters 
          paramOrder={paramOrder} 
          kindOrder={kindOrder} 
          setParamOrder={(i:ParamOrderType)=>setParamOrder(i)} 
          setKindOrder={(i:KindOrderType)=>setKindOrder(i)} 
          pagination={<Pagination min={minPage} max={maxPage} page={page} setPage={setPage}/>}
          action={handleSearchAnswers}
        />
        <div className="flex flex-col mt-12 ml-10 md:ml-24 lg:ml-48">
          {answers.map(a=>{
            return <Answer text={a.text} when={a.when} user={a.user} likes={a.likes} id={a.id} idLikeSt={a.idLike}/>
          })}
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-end">
          <Pagination min={minPage} max={maxPage} page={page} setPage={setPage}/>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = (state:any)=>{
  return{userId:getUserId(state.user)}
}

export default connect(mapStateToProps,null)(Answers);
