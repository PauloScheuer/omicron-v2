import {Knex} from 'knex';

// A função seed insere uma ou mais entradas na tabela definida. É executada quando o comando db-s for rodado no terminal
export async function seed(knex: Knex) {
  await knex('discovers').insert([
    {
      nameDiscover: 'Pitágoras',
      textDiscover: '<p>Pitágoras foi um filósofo e matemático pré-socrático, nascido em 570 a.C. na ilha grega de Samos. Durante sua formação, foi orientado por ninguém menos que Tales de Mileto (considerado o primeiro filósofo, pelo menos no ocidente). Por conta de suas idéias fora do padrão da época, foi perseguido e fugiu para a Crotona, fundando lá a Escola Pitagórica, uma escola não apenas matemática, mas com preceitos místicos e espirituais.</p><p>Em um experimento com cordas, seus tamanhos e o som produzido ao serem tocadas, Pitágoras chegou a relações matemáticas agradáveis ao ouvido humano, criando assim escalas musicais. Esse experimentou corroborou com a criação de sua teoria de que os números eram a essência de todas as coisas.</p><p>Após um tempo, Pitágoras foi novamente perseguido, fugindo dessa vez para o Egito. Foi lá que, ao observar as pirâmides, criou o famoso Teorema de Pitágoras. Acabou morrendo, ao 80 anos no sul da Itália, em Metaponto.</p>',
      imgDiscover: 'pitagoras.jpg'
    },
    {
      nameDiscover: 'Euclides',
      textDiscover: '<p>Euclides foi um filósofo e matemático nascido na Síria, em 330 a.C. e conhecido como <i>O pai da geometria</i>. Sobre sua vida e trajetória, pouco se sabe, pois as referências a ele somente foram feitas séculos após sua morte (cuja data também não é conhecida). A principal referência foi a feita por Proclo, que atribuiu a Euclides a autoria da obra <i>Os elementos</i>, com enorme importância para a matemática. Esta e outras obras suas sobreviveram (mesmo que de forma parcial) até hoje e são consideradas alguns dos mais antigos tratados científicos gregos.</p><p>Embora grande parte daquilo exposto por Euclides em Os Elementos seja conhecimentos e demonstrações de ideias de outros matemáticos anteriores a ele, Euclides foi quem conseguiu organizar tudo em algo lógico, criando assim a base para o ensino da geometria até o início do século XX.</p>',
      imgDiscover: 'euclides.jpg'
    },
    {
      nameDiscover: 'Arquimedes',
      textDiscover: '<p>Arquimedes foi um matemático, físico e inventor nascido e falecido em Siracusa, na Sicília, nos anos respectivos de 287 a.C e 212 a.C, quando forças romanas capituraram sua cidade natal.</p><p>Apesar de ser conhecido popularmente como um exímio inventor, Arquimedes foi também um grande matemático, considerado inclusive um dos maiores da história. É dito que, se os gregos tivessem um sistema numérico mais avançado, Arquimedes poderia ter inventado o cálculo.</p><p>Uma das demonstrações de seu conhecimento foi a utilização do método da exaustão para a aproximação do pi, chegando em seu valor de forma bastante aproximada (entre 3,1408 e 3,1429 enquanto o conhecido hoje é cerca de 3,1416).</p>',
      imgDiscover: 'arquimedes.jpg'
    },
    {
      nameDiscover: 'Euler',
      textDiscover: '<p>Leonard Euler foi um matemático suiço nascido em 1707, na Basiléia. Além de matemática, estudou também teologia e medicina. É considerado o matemático que mais produziu na história, contando 866 livros e artigos publicados. Seu esforço nos estudos foi tamanho que, aliado ao frio da Rússia, ondeu morou parte da sua vida, gerou uma saúde debilitada que resultou por fim  na perca de sua visão.</p><p>Foi o responsável pelo refinamento da noção de uma função matemática, criando também várias notações matemáticas usados atualmente, como o π (pi) e o <i>e</i>, que frequentemente é chamado de constante de Euler, em sua homenagem.</p><p>Morreu em 1783, em sua segunda passagem pela Rússia. Sua contribuição com artigos científicos foi tão grande que mesmo após seu falecimento a Academia de São Petersburgo continuou os publicando por 50 anos.</p>',
      imgDiscover: 'euler.jpg'
    },
    {
      nameDiscover: 'Descartes',
      textDiscover: '<p>René Descartes foi um pensador francês nascido em 1596. Suas contribuições passas pela matemática, filosofia e até mesmo medicina. É conhecido tanto como <i>Pai da filosofia moderna</i>, quanto por <i>Pai da matemática moderna</i>.</p><p>Sua principal contribuição para a matemática foi ter sugerido a união entre a álgebra e a geometria, gerando assim o campo da geometria análitica e de um sistema de coodenadas com seu nome, o espaço cartesiano. As ideias que contribuiram com esse surgimento estão no texto <i>Geometria</i>, em sua obra <i>Discurso do método</i>.</p>',
      imgDiscover: 'descartes.jpg'
    },
  ]);
}
