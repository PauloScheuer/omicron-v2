import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import api from '../../services/api';
import Layout from '../../components/Layout';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Filters from './Filters';
import { ContentType, EditingPubliType, KindOrderType, ModalType, ParamOrderType, QuestionType } from '../../utils/types';
import Question from './Question';
import Pagination from './Pagination';
import { getUserId } from '../../utils/getAttributes';
import Modal from '../../components/Modal';
import ButtonCreate from '../../components/ButtonCreate';

interface ForumI{
  userId:number;
}

const Forum = ({userId}:ForumI) => {
  const [content, setContent] = useState<ContentType>({nameContent:'',textContent:'',neededFieldsContent:0,levelContent:0,indexContent:0,fields:[]});
  const [paramOrder, setParamOrder] = useState<ParamOrderType>(ParamOrderType.date);
  const [kindOrder, setKindOrder] = useState<KindOrderType>(KindOrderType.desc);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage,setMaxPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalEntity, setModalEntity] = useState<ModalType>(ModalType.mteQuestion);
  const [modalAction, setModalAction] = useState<ModalType>(ModalType.mtaCreate);
  const [editingQuestion, setEditingQuestion] = useState<EditingPubliType>(null);
  const minPage = 1;

  const { index } = useParams();

  const history = useHistory();

  useEffect(()=>{
    handleGetContent();
    handleSearchQuestions(page);
  /* eslint-disable-next-line */
  },[page]);


  useEffect(()=>{
    if(showModal){
      document.body.style.overflow = 'hidden'
    }else{
      document.body.style.overflow = 'auto';
      handleSearchQuestions(page)
    }
  //eslint-disable-next-line
  },[showModal]);

  const handleGetContent = async()=>{
    try {
      const res = await api.get('/content/show/'+index);
      setContent(res.data.content);
    } catch (err) {
      alert('Erro carregando conteúdo');
    }
  }

  const handleSearchQuestions = async(searchPage:number)=>{
    try{
      const res = await api.get(`/question/index/?page=${searchPage}&content=${index}&order=${paramOrder}&by=${kindOrder}&user=${userId}`);
      setQuestions(res.data.questions);
      setMaxPage(res.data.pages);
      if (searchPage !== page){
        setPage(searchPage)
      }
    }catch(err){
      alert('Erro ao carregar a página!');
      history.push('/forum');
    }
  }

  const handleOpenModal = (entity:ModalType,action:ModalType,editingData:EditingPubliType = null)=>{
    setModalEntity(entity);
    setModalAction(action);
    setEditingQuestion(editingData)
    setShowModal(true);
  }

  return(
    <Layout>
      <Modal show={showModal} setShow={(b:boolean)=>setShowModal(b)} content={index} type={{entity:modalEntity,action:modalAction}} publiData={editingQuestion}/>
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
        <h1 className="text-secundary text-4xl font-bold mt-6">Fórum sobre {content.nameContent || 'conteúdo'}</h1>
        <ButtonCreate action={()=>handleOpenModal(ModalType.mteQuestion,ModalType.mtaCreate)} enabled={userId !== 0} text={'Nova pergunta'}/>
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
            return <Question
              title={q.title}
              text={q.text}
              when={q.when}
              user={q.user}
              id={q.id}
              likes={q.likes}
              hasLikedSt={q.hasLiked}
              hasCreated={q.hasCreated}
              postDelete={()=>handleSearchQuestions(page)}
              callEdit={()=>handleOpenModal(ModalType.mteQuestion,ModalType.mtaEdit,{id:q.id,title:q.title,text:q.text})}
              key={q.id}
            />
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
