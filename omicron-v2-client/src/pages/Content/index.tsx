import React, { useEffect, useState } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Calculator from './Calculator';
import Card from '../../components/Card';
import Layout from '../../components/Layout';
import { CardType, ContentType } from '../../utils/types';
import api from '../../services/api';

const Content = () => {
  const [content, setContent] = useState<ContentType>();
  const { index } = useParams();
  useEffect(() => {
    //função que procura os conteúdos
    const searchContents = async () => {
      try {
        const res = await api.get('content/show/'+index);
        setContent(res.data.content);
        console.log(res.data.content)
      } catch (err) {
        alert(err);
      }
    };
    searchContents();
  }, []);
  return( 
    <Layout>
        {content && (
          <div className="md:px-32 px-10 py-20">
            <h1 className="text-secundary font-bold text-4xl text-center">{content?.nameContent}</h1>
            <div className="flex lg:flex-nowrap flex-wrap justify-between items-baseline mt-20">
              <Calculator fields={content?.fields} neededFields={content?.neededFieldsContent}/>
              <Card title="Sobre" 
                    text={content?.textContent || ''}
                    kind={CardType.cdContentText}
                    />
            </div>
            <Link to='/forum' className="flex justify-center items-center mt-20">
              <span className="font-bold text-primaryDark text-xl ">Ir para o fórum de {content?.nameContent}</span>
              <FiArrowRight
                className="text-secundary"
                size={24}
                />
            </Link>
          </div>
        )}
    </Layout>)
}
export default Content;
