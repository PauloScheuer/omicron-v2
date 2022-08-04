import React, { useEffect, useState } from 'react';
import {CardType, ContentType} from '../../utils/types';
import api from '../../services/api';

import Layout from '../../components/Layout';
import Card from '../../components/Card';
import DescAndFilter from '../../components/DescAndFilter';
import { Link } from 'react-router-dom';

const listFilters = ['Todos', '1º ano', '2º ano', '3º ano'];

export default function Contents() {
  const [selected, setSelected] = useState<number>(0);
  const [contents, setContents] = useState<ContentType[]>([]);

  useEffect(() => {
    //função que procura os conteúdos
    const searchContents = async () => {
      try {
        const res = await api.get('content/index',{params: {level: selected}});
        setContents(res.data.contents);
      } catch (err) {
        alert(err);
      }
    };
    searchContents();
  }, [selected]);

  return <Layout>
    <div className="md:px-32 px-10 py-20">
      <DescAndFilter 
        title="Conteúdos" 
        subtitle="Acesse mais de XX conteúdos divididos em diferentes níveis"
        caption="Selecione um filtro:"
        listOfOptions={listFilters}
        selected={selected}
        setSelected={setSelected}
      />
      <h3 className="font-bold text-3xl text-primaryDark mb-8">Resultados</h3>
      <div className="flex flex-wrap justify-center sm:justify-start">
        {contents.length > 0 ?
        contents.map(({nameContent, textContent, indexContent})=>{
          return(
            <Link to={`/conteudos/${indexContent}`} key={indexContent}>
              <Card 
                title={nameContent} 
                text={textContent}
                kind={CardType.cdContentItem}
              />
            </Link>)
        })
        :
        (<p className="text-lg font-medium">Sem resultados para o filtro selecionado :(</p>)
      }
      </div>

    </div>
  </Layout>;
}
