import React, { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory, useParams } from 'react-router-dom'
import Layout from '../../../components/Layout'
import api from '../../../services/api'
import {connect} from 'react-redux'
import { AnswerType, EditingPubliType, KindOrderType, ModalType, ParamOrderType, QuestionType } from '../../../utils/types'
import Filters from '../Filters'
import Pagination from '../Pagination'
import Question from '../Question'
import Answer from './Answer'
import { getUserId } from '../../../utils/getAttributes'
import ButtonCreate from '../../../components/ButtonCreate'
import Modal from '../../../components/Modal'

interface AnswersI{
  userId:number;
}

const Answers = ({userId}:AnswersI) => {
  const [paramOrder, setParamOrder] = useState<ParamOrderType>(ParamOrderType.date);
  const [kindOrder, setKindOrder] = useState<KindOrderType>(KindOrderType.asc);
  const [question, setQuestion] = useState<QuestionType>();
  const [page, setPage] = useState<number>(1);
  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalEntity, setModalEntity] = useState<ModalType>(ModalType.mteQuestion);
  const [modalAction, setModalAction] = useState<ModalType>(ModalType.mtaEdit);
  const [editingPubli, setEditingPubli] = useState<EditingPubliType>(null);

  const minPage = 1;

  const {id} = useParams()
  const history= useHistory();

  useEffect(()=>{
    handleSearchQuestion();
    /* eslint-disable-next-line */
  },[])

  useEffect(()=>{
    if(showModal){
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = 'auto';
      handleSearchQuestion();
      handleSearchAnswers(page);
    }
  //eslint-disable-next-line
  },[showModal]);

  useEffect(()=>{
    handleSearchAnswers(page);
    /* eslint-disable-next-line */
  },[page])

  const handleSearchQuestion = async ()=>{
    try{
      const res = await api.get(`question/show/${id}?user=${userId}`);
      setQuestion(res.data.question);

    }catch(err){
      alert('Erro ao carregar a página!');
      history.goBack();
    }
  }

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

  const handleOpenModal = (entity:ModalType,action:ModalType,editingData:EditingPubliType = null)=>{
    setModalEntity(entity);
    setModalAction(action);
    setEditingPubli(editingData)
    setShowModal(true);
  }

  return (
    <Layout>
      {question && (
        <Modal show={showModal} setShow={(b:boolean)=>setShowModal(b)} question={question.id} type={{entity:modalEntity,action:modalAction}} publiData={editingPubli}/>
      )}
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
          <Question
            title={question.title}
            text={question.text}
            when={question.when}
            user={question.user}
            likes={question.likes}
            id={question.id}
            hasLikedSt={question.hasLiked}
            hasCreated={question.hasCreated}
            postDelete={()=>history.goBack()}
            callEdit={()=>handleOpenModal(ModalType.mteQuestion,ModalType.mtaEdit,{id:question.id,title:question.title,text:question.text})}
            alone={true}/>
        )}
        <h1 className="text-secundary text-3xl font-bold">Respostas:</h1>
        <ButtonCreate action={()=>handleOpenModal(ModalType.mteAnswer,ModalType.mtaCreate)} enabled={userId !== 0} text={'Nova resposta'}/>
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
            return <Answer
                    text={a.text}
                    when={a.when}
                    user={a.user}
                    likes={a.likes}
                    id={a.id}
                    hasLikedSt={a.hasLiked}
                    hasCreated={a.hasCreated}
                    postDelete={()=>handleSearchAnswers(page)} key={a.id}
                    callEdit={()=>handleOpenModal(ModalType.mteAnswer,ModalType.mtaEdit,{id:a.id,title:'',text:a.text})}
                    />
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
