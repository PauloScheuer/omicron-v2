import React, { useState, useEffect } from 'react';
import { ContentType } from '../../utils/types';
import api from '../../services/api';
import Layout from '../../components/Layout';
import DescAndFilter from '../../components/DescAndFilter';
import { useHistory } from 'react-router-dom';

const ForumList = () => {
  const [contents, setContents] = useState<ContentType[]>([]);

  const history = useHistory();

  useEffect(()=>{
    const searchContents = async()=>{
      try {
        const res = await api.get('content/index',{params:{level:0}});
        setContents(res.data.contents)
        
      } catch (error) {
        alert(error);
      }
    }

    searchContents();
  })

  const handleNavigateToContent = (i: number)=>{
    history.push('/forum/'+contents[i].indexContent);
  }

  return( 
    <Layout>
      <div className="md:px-32 px-10 py-20">
        {contents.length > 0 && (
          <DescAndFilter
            title="Bem vindo ao fórum do Omicron!"
            subtitle="Selecione um dos conteúdos abaixo para começar a perguntar e responder" 
            caption="Conteúdos"
            listOfOptions={contents.map(content=>content.nameContent)}
            selected={-1}
            setSelected={handleNavigateToContent}
          />
        )}
      </div>
    </Layout>
  )
}
export default ForumList;
