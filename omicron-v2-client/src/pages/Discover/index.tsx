import React, { useEffect, useState } from 'react';
import {CardType} from '../../utils/types';
import api from '../../services/api';

import Layout from '../../components/Layout';
import Card from '../../components/Card';
import DescAndFilter from '../../components/DescAndFilter';

interface DiscoverI{
  nameDiscover: string;
  textDiscover: string;
  imgDiscover: string;
}

export default function Discover() {
  const [selected, setSelected] = useState<number>(0);
  const [discovers, setDiscovers] = useState<DiscoverI[]>([]);

  useEffect(() => {
    //função que procura os conteúdos
    const searchDiscovers = async () => {
      try {
        const res = await api.get('discover/index');
        setDiscovers(res.data.discovers);
        console.log(res.data.discovers)
      } catch (err) {
        alert(err);
      }
    };
    searchDiscovers();
  }, []);

  return <Layout>
    <div className="md:px-32 px-10 py-20">
      {discovers.length > 0 && (
        <>
          <DescAndFilter 
          title="Descubra+" 
          subtitle="Aprenda mais sobre grandes personalidades que mudaram o rumo da Matemática"
          caption="Selecione um nome:"
          listOfOptions={discovers.map(discover=>discover.nameDiscover)}
          selected={selected}
          setSelected={setSelected}
          />
          <Card 
          title={discovers[selected].nameDiscover} 
          text={discovers[selected].textDiscover}
          img={discovers[selected].imgDiscover}
          kind={CardType.cdPerson}
          />
      </>
      )}
    </div>
  </Layout>;
}
