import React from 'react';
import { CardType } from '../utils/types';

interface CardI{
  title : string;
  text  : string;
  kind  : CardType;
}

const Card = ({title, text, kind}:CardI) => {
  return (
    <div className={`bg-white rounded-lg flex-none 
      ${kind === CardType.cdContentItem ? 
          'w-72 sm:w-80 px-8 py-8 mb-4 sm:mr-4' :
        kind === CardType.cdPerson ? 
          'md:px-20 px-8 py-16' :
          'w-full lg:w-7/12 md:px-20 px-8 py-16'
      }`}
    >
      <h3 className={`text-primaryDark font-bold text-3xl mb-6 
                    ${kind === CardType.cdContentItem ? 
                      'text-center h-16' : 
                      kind === CardType.cdContentText ?
                      'text-center h-12' :
                      'h-12'
                    }`}>{title}</h3>
      <div dangerouslySetInnerHTML={{__html:text}} className={`${kind === CardType.cdContentItem && 'max-h-24 text-ellipsis overflow-hidden'}`}></div>
      {kind === CardType.cdContentItem && (<p>...</p>)}
    </div>
  );
}
export default Card;
