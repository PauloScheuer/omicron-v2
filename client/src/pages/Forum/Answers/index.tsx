import React, { useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Layout from '../../../components/Layout'
import { KindOrderType, ParamOrderType } from '../../../utils/types'
import Filters from '../Filters'
import Pagination from '../Pagination'
import Question from '../Question'
import Answer from './Answer'

const q ={
  titleQuestion: 'Dúvida sobre matemática',
  textQuestion:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum?',
  whenQuestion:'04/09/2022',
  userQuestion:'Paulo Roberto',
  likes: 57
}

const answers = [
  {
    textAnswer:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum?',
    whenAnswer:'04/09/2022',
    userAnswer:'Paulo Roberto',
    likes: 57
  },
  {
    textAnswer:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum?',
    whenAnswer:'04/09/2022',
    userAnswer:'Paulo Roberto',
    likes: 84
  },
  {
    textAnswer:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum?',
    whenAnswer:'04/09/2022',
    userAnswer:'Paulo Roberto',
    likes: 22
  },
]

export default function Answers() {
  const [paramOrder, setParamOrder] = useState<ParamOrderType>(ParamOrderType.date);
  const [kindOrder, setKindOrder] = useState<KindOrderType>(KindOrderType.desc);

  return (
    <Layout>
      <div className="md:px-32 px-10 py-20">
        <div className="mb-6">
          <Link to="/forum/1">
            <div className="flex items-center">
              <FiArrowLeft
                className="text-primaryDark"
                
                size={20}
                />
              <span className="text-primary font-medium">Voltar para perguntas</span>
            </div>
          </Link>
        </div>
        <Question title={q.titleQuestion} text={q.textQuestion} when={new Date()} user={q.userQuestion} likes={q.likes} alone={true}/>
        <h1 className="text-secundary text-3xl font-bold">Respostas:</h1>
        <Filters 
          paramOrder={paramOrder} 
          kindOrder={kindOrder} 
          setParamOrder={(i:ParamOrderType)=>setParamOrder(i)} 
          setKindOrder={(i:KindOrderType)=>setKindOrder(i)} 
          pagination={<></>}
          action={()=>{}}
        />
        <div className="flex flex-col mt-12 ml-10 md:ml-24 lg:ml-48">
          {answers.map(q=>{
            return <Answer text={q.textAnswer} when={q.whenAnswer} user={q.userAnswer} likes={q.likes}/>
          })}
        </div>
        <div className="flex flex-col lg:flex-row lg:justify-end">
          {/* <Pagination /> */}
        </div>
      </div>
    </Layout>
  )
}
