import {Knex} from 'knex';

// A função seed insere uma ou mais entradas na tabela definida. É executada quando o comando db-s for rodado no terminal
export async function seed(knex: Knex) {
  await knex('contents').insert([
    {
      nameContent: 'Função Afim',
      textContent: '<p>Uma função afim, ou função linear, é uma função polinomial de grau 1 com formato de f(x)=ax+b. O nome de função linear vem do formato de seu gráfico, que corresponde a uma linha reta. </p><p>A variável <i>a</i> representa o coeficiente angular dessa reta, ou seja, determina o ângulo dessa reta referente ao eixo x. Em caso de valor zero, temos uma equação contante, significando que para qualquer valor de x, y sempre será igual.</p><p>Enquanto isso, <i>b</i> é o coeficiente linear, representando o ponto onde a reta corta o eixo y. Se seu valor for igual a zero, a função passará pela origem, ou seja, pelo ponto (0,0) do plano cartesiano.</p><p>Pode-se dividir uma função afim em dois tipos: crescente e decrescente. Como cada nome diz, uma função crescente é aquela em que quanto maior o valor de x usado, maior será o valor de f(x), enquanto na decrescente temos o contrário, com f(x) diminuindo conforme o valor de x aumenta.</p>',
      levelContent: 1,
      indexContent: 100
    },
    {
      nameContent: 'Função Quadrática',
      textContent: '<p>Uma função quadrática é uma função polinomial de grau 2 com formato de f(x)=ax²+bx+c, tendo seu gráfico no formato de parábola.</p><p>Para se caracterizar verdadeiramente como uma função quadrática, <i>a</i> deve ser diferente de 0, pois com esse valor teriamos f(x)=bc+c, que representa uma função afim. Além disso, a,b e c devem ser números naturais.</p><p>O método mais utilizado para resoluções desse tipo de função é a <i>baskara</i> (usado em nossa calculadora). Por ela, é possível encontrar as raízes da função, ou seja, os valores de x quando a parábola corta o eixo x.</p><p>Quanto ao gráfico da função, pode-se dividir entre dois tipos: Os com a concavidade voltada para cima e aqueles com ela voltada para baixo. Se a>0, temos a concavidade para cima, enquanto a<0 gera uma para baixo. Assim, há outro ponto interessante no gráfico: o vértice da parábola, seu valor mínimo ou máximo. Esse valor, junto as raízes da função, é necessário para o esboço do gráfico (em nossa calculadora, é ensinado como chegar nesse valor).</p>',
      levelContent: 1,
      indexContent: 101
    },
    {
      nameContent: 'Função Exponencial',
      textContent: '<p>Uma função exponencial é aquela onde o x, que representa a variável, está no expoente, e não na base. Na calculadora encontrada nessa página, usa-se o formato f(x)=ax+b, pelo b permitir a existência de um valor inicial, o que é útil em certos casos que a função exponencial engloba.</p><p>Para ser uma função exponencial, há certas restrições de valores. Para a, não são possíveis valores negativos, o 0 e o 1. A restrição aos números negativos se deve a possibilidade do expoente representar uma raíz que não possua valores reais em caso de números negativos. Para o 0, a explicação vem da exponenciação: se x for 0 e tivermos então 00, teria-se um valor indeterminado. Quanto ao 1, o motivo é que ele, elevado a qualquer número, é igual a 1, então teria-se uma função constante.</p><p>Por fim, uma função exponencial pode ser classificada, assim como a afim, como crescente ou decrescente. Para saber qual a classificação, basta observar o valor de a. Quando a>1, a função é crescente, enquanto a<1 gera uma função decrescente.</p>',
      levelContent: 1,
      indexContent: 102
    },
    {
      nameContent: 'Função Logarítmica',
      textContent: '<p>Uma função logarítmica é uma função do tipo f(x) =logax, com a sendo sempre maior que 0 e diferente de 1 e x também maior que 0. Essas restrições se devem ao fato de não existirem raízes de certos índices (como 2) para números negativos, além 00 ser uma indeterminação. Para o valor do logaritmo, admite-se qualque número real.</p><p>O logaritmo é uma ferramenta utilizada para se encontrar o expoente de uma base a. Isso significa que a base a, quando elevada f(x), resulta em x. A semelhança notável entre essa função e a função exponencial pode ser explicada pelo fato de uma ser a função inversa da outra.</p><p>Esse tipo de função, assim como uma função afim ou exponencial, pode ser classificado em crescente, com a>1, ou decrescente, com a<1.</p>',
      levelContent: 1,
      indexContent: 103
    },
    {
      nameContent: 'PA - Termo Geral',
      textContent: '<p>Uma PA, ou progressão aritmética, é um tipo de sequência que cresce conforme uma razão r. Essa razão representa a diferença entre cada termo e seu anterior na sequência. Além de r, outros elementos em uma PA são o n (número de termos), o a1 (termo inicial) e o an, o termo geral.</p><p>Nessa página, será abordado o cálculo do termo geral de uma PA, que nada mais é do que o termo que a sequência assume quando n chegar a um valor específico. Esse cálculo é realizado pela seguinte fórmula: an = a1+(n-1)r .</p><p>Observando a fórmula do termo geral de uma PA, pode-se observar sua relação com a fórmula de uma função afim. Essa relação resulta em um gráfico para a PA nos mesmos moldes de um gráfico de um função de primeiro grau, sendo representado por uma linha reta.</p>',
      levelContent: 1,
      indexContent: 104
    },
    {
      nameContent: 'PA - Soma',
      textContent: '<p>Uma PA, ou progressão aritmética, é um tipo de sequência que cresce conforme uma razão r. Essa razão representa a diferença entre cada termo e seu anterior na sequência. Além de r, outros elementos em uma PA são o n (número de termos), o a1 (termo inicial) e o an, o termo geral.</p><p>Nessa página, será abordado o cálculo da soma dos termos de uma PA, dada pela seguinte fórmula: Sn = (a1+an).n/2. Nota-se que a razão r não é necessária para esse cálculo.</p><p>O cálculo da soma pode ser deduzido através da seguinte maneira: escreve-se todos os termos da sequência em sua ordem correta. Assim, pode-se observar que a soma do primeiro com o último será igual a do segundo com o penúltimo, e assim por diante. Então, basta multiplicar essa soma pelo número de termos e dividir por dois, para descontar as somas repetidas.</p>',
      levelContent: 1,
      indexContent: 105
    },
    {
      nameContent: 'PG - Termo Geral',
      textContent: '<p>Uma PG, ou progressão geométrica, é um tipo de sequência que cresce conforme uma razão q. Essa razão representa a divisão entre cada termo e seu anterior na sequência. Além de q, outros elementos em uma PG são o n (número de termos), o a1 (termo inicial) e o an, o termo geral.</p><p>Nessa página, será abordado o cálculo do termo geral de uma PG, que nada mais é do que o termo que a sequência assume quando n chegar a um valor específico. Esse cálculo é realizado pela seguinte fórmula: an = a1*qn-1 .</p><p>Observando a fórmula do termo geral de uma PG, pode-se observar sua relação com a fórmula de uma função exponencial. Essa relação resulta em um gráfico para a PG nos mesmos moldes de um gráfico de um função exponencial, sendo representado por uma curva exponencial.</p><p>Uma PG pode ser crescente, constante, decrescente, oscilante ou quase nula. Para ser crescente, é necessário que o primeiro termo seja positivo, assim como a razão, ou que o primeiro termo seja negativo e a razão entre 0 e 1. Para ser contante sua razão deve ser 1 ou indeterminada (como em uma sequência 0,0,0,...,0). No caso de uma PG decrescente, tem-se o contrário da crescente, com ou o primeiro termo positivo e a razão entre 0 e 1, ou o primeiro termo negativo e a razão negativa. Em caso de razão negativa a PG será oscilante, pois temos que positivo*negativo = negativo e negativo*negativo = positivo. Por fim, uma PG quase nula é aquela em que o primeiro termo é diferente de zero e os restantes são iguais a zero.</p>',
      levelContent: 1,
      indexContent: 106
    },
    {
      nameContent: 'PG - Soma',
      textContent: '<p>Uma PG, ou progressão geométrica, é um tipo de sequência que cresce conforme uma razão q. Essa razão representa a divisão entre cada termo e seu anterior na sequência. Além de q, outros elementos em uma PG são o n (número de termos), o a1 (termo inicial) e o an, o termo geral.</p><p>Nessa página, será abordado o cálculo da soma dos termos de uma PG finita, dada pela seguinte fórmula: Sn = (a1*(qn-1))/(q-1). Nota-se que o valor de an não é necessário para esse cálculo.</p><p>Uma PG pode ser crescente, constante, decrescente, oscilante ou quase nula. Para ser crescente, é necessário que o primeiro termo seja positivo, assim como a razão, ou que o primeiro termo seja negativo e a razão entre 0 e 1. Para ser contante sua razão deve ser 1 ou indeterminada (como em uma sequência 0,0,0,...,0). No caso de uma PG decrescente, tem-se o contrário da crescente, com ou o primeiro termo positivo e a razão entre 0 e 1, ou o primeiro termo negativo e a razão negativa. Em caso de razão negativa a PG será oscilante, pois temos que positivo*negativo = negativo e negativo*negativo = positivo. Por fim, uma PG quase nula é aquela em que o primeiro termo é diferente de zero e os restantes são iguais a zero.</p>',
      levelContent: 1,
      indexContent: 107
    },
    {
      nameContent: 'PG - Soma Infinita',
      textContent: '<p>Uma PG, ou progressão geométrica, é um tipo de sequência que cresce conforme uma razão q. Essa razão representa a divisão entre cada termo e seu anterior na sequência. Além de q, outros elementos em uma PG são o n (número de termos), o a1 (termo inicial) e o an, o termo geral.</p><p>Nessa página, será abordado o cálculo da soma dos termos de uma PG infinita, dada pela seguinte fórmula: S = a1/(1-q). Nota-se que o valor de an ou de n não são necessários para esse cálculo, por não existir um n final em uma progressão infinita.</p><p>Pode-se demonstrar essa fórmula através do seguinte pensamento: suponha que temos uma folha de papel e resolvamos pintá-la. Para isso, determinamos que se começará pintando metade da folha e depois disso, metade do que ainda não foi pintado até a folha estar completamente pintada. Como pode-se conferir na calculadora dessa página, uma PG infinita com a1 = 0.5 e q = 0.5 resultará em uma soma valendo 1 (a folha completa).</p>',
      levelContent: 1,
      indexContent: 108
    },
    {
      nameContent: 'Arranjo',
      textContent: '<p>Um arranjo é um agrupamento de p elementos dentro de um conjunto de n elementos. Uma propriedade importante de um arranjo é que nele, a ordem dos elementos faz diferença, e por isso, precisa-se tomar cuidado ao escolher se esse é o melhor cálculo a seer utilizado para a situação.</p><p>Um exemplo de situação onde é necessário usar arranjo é na pergunta: Quantos números de 3 algarismos pode-se formar com os algarismos 1,2 e 3. Para responder essa pergunta, deve-se atentar que 123 é diferente de 321, e portanto, trata-se de um arranjo.</p><p>A fórmula para o arranjo é de n!/(n-p)!, onde n é o número total de elementos de um conjuto e p o tamanho do agrupamento. No exemplo acima, teria-se que n=3 e p=3, pois temos 3 algarismos utilizáveis (n) e o conjunto formado terá tamanho 3 (p). Você pode conferir a resposta para esse problema utilizando nossa calculadora.</p>',
      levelContent: 2,
      indexContent: 200
    },
    {
      nameContent: 'Combinação',
      textContent: '<p>Uma combinação é um agrupamento de p elementos dentro de um conjunto de n elementos. Uma propriedade importante de uma combinação é que nela, a ordem dos elementos não importa, e por isso, precisa-se tomar cuidado ao escolher se esse é o melhor cálculo a ser utilizado para a situação.</p><p>Um exemplo de situação onde é necessário usar combinação é ao se calcular o número de jogos possíveis a se fazer ao apostar na mega-sena. Para responder essa pergunta, deve-se perceber que um jogo com 1,2,3,4,5,6 e outro 2,3,4,5,6,1 são iguais perante ao jogo e portanto, trata-se de uma combinação.</p><p>A fórmula para a combinação é de n!/(p!(n-p)!), onde n é o número total de elementos de um conjuto e p o tamanho do agrupamento. No exemplo acima, teria-se que n=60 e p=6, pois temos 60 algarismos utilizáveis (n) e o conjunto formado terá tamanho 6 (p). Você pode conferir a resposta para esse problema utilizando nossa calculadora.</p>',
      levelContent: 2,
      indexContent: 201
    },
    {
      nameContent: 'Probabilidade',
      textContent: '<p>Uma probabilidade de um evento acontecer é definida através da divisão entre o número de eventos favoráveis pelo espaço amostral, ou seja, o número total de eventos possíveis. Podemos tomar com exemplo de evento a chance de, ao se jogar um dado, obtermos um número menor que 4. Nesse caso, o conjunto de eventos favoráveis é {1,2,3}, enquanto o conjunto do espaço amostral é {1,2,3,4,5,6}. Assim, a probabilidade de tal evento acontecer é de 3/6 = 0.5, ou 50%.</p><p>Pode-se nota que uma probabilidade sempre estará entre 0 e 1 (ou 0% e 100%). Isso se deve ao fato de que os eventos favoráveis são subconjuntos de um espaço amostral, e assim, não podem ultrapassar seu valor.</p>',
      levelContent: 2,
      indexContent: 202
    },
    {
      nameContent: 'Pitágoras',
      textContent: '<p>Em um triângulo retângulo, chamamos os dois lados adjacentes ao ângulo reto (de 90°) de catetos e o lado oposto a esse ângulo de hipotenusa. A fórmula de Pitágoras se trata de uma relação entre esses três lados. Tal relação se dá de maneira que a soma dos quadrados dos catetos é igual ao quadrado da hipotenusa.</p><p>Chamando a hipotenusa de c e os dois de catetos de a e b, temos que a2+b2 = c2. Para exemplificar essa fórmula, uma das relações mais famosa é a entre os números 3,4, e 5. Sendo 3 e 4 os valores dos catetos, temos que 32+42=52. Usando dois desses valores na calculadora dessa página, você poderá observar essa relação.</p>',
      levelContent: 2,
      indexContent: 203
    },
    {
      nameContent: 'Funções Trigonométricas',
      textContent: '<p>As funções trigonométricas são funções relacionadas com o círculo trigonométrico. As principais delas e que serão abordadas nessa página são as funções seno, cosseno e tangente.</p><p>A função seno é uma função periódica (que seu comportamento se repete) com período de 360° ou 2π radianos. O valor de f(x) é positivo quando x passa pelo primeiro e segundo quadrantes do círculo trigonométrico, enquanto ao passar pelo terceiro e quarto quadrantes seu valor é negativo.</p><p>A função cosseno, assim como a seno, também é periódica, com período de 360° ou 2π radianos. O valor de f(x) é positivo quando x passa pelo primeiro e quarto quadrantes do círculo trigonométrico, enquanto ao passar pelo segundo e terceiro quadrantes seu valor é negativo.</p><p>Vale ressaltar que tanto para função seno quanto para a cosseno, os valores de f(x) estão contidos no intervalo entre -1 e 1, não podendo assumir valores superiores ou inferiores a esses limites.</p><p>Por último, temos a função tangente, que é o resultado da divisão entre seno e cosseno. Essa função também é periódica, mas tendo um período maior que as duas últimas: 180° ou π radianos. O sinal de f(x) é positivo quando seno e cosseno possuem o mesmo sinal, ou seja, no primeiro e terceiro quadrantes. Para o segundo e quarto quadrantes, onde seno e cosseno assumem sinais diferente, a tangente é negativa.</p>',
      levelContent: 2,
      indexContent: 204
    },
    {
      nameContent: 'Radiano e Grau',
      textContent: '<p>Em um círculo trigonométrico, podemos representar o um valor por seu ângulo, medindo então em graus, ou pelo seu arco, este medido em radianos. Para evitar erros em cálculos, é necessário converter corretamente de uma medida para a outra. Para isso, basta saber que 180° equivalem a 1π radiano.</p>',
      levelContent: 2,
      indexContent: 205
    },
    {
      nameContent: 'Juros Simples',
      textContent: '<p>O juro (J) é um valor cobrado como remuneração ou compensação em cima de uma compra ou empréstimo, ou seja, operações que envolvam dinheiro no geral. Outros conceitos importantes de se saber ao ter um primeiro contato com esse contéudo são o de capital inicial (C), o valor empregado inicialmente na operação, o de montante (M), a soma do capital com os juros, e o de taxa (i), a parte do capital que se transformará em juros. Além desses valores, temos o tempo (t), que deve estar sempre proporcional a taxa (por exemplo, se a taxa é cobrada ao mês, o tempo estará em meses).</p><p>No caso de juros simples, temos que a taxa é cobrada sempre em cima do valor inicial, de C, tendo então sua fórmula como J = C*i*t. O montante de uma operação a juros simples é de M = C + C.i.t, uma fórmula que possui o formato de uma função afim, e portanto, seu gráfico é linear.</p>',
      levelContent: 3,
      indexContent: 300
    },
    {
      nameContent: 'Juros Compostos',
      textContent: '<p>O juro (J) é um valor cobrado como remuneração ou compensação em cima de uma compra ou empréstimo, ou seja, operações que envolvam dinheiro no geral. Outros conceitos importantes de se saber ao ter um primeiro contato com esse contéudo são o de capital inicial (C), o valor empregado inicialmente na operação, o de montante (M), a soma do capital com os juros, e o de taxa (i), a parte do capital que se transformará em juros. Além desses valores, temos o tempo (t), que deve estar sempre proporcional a taxa (por exemplo, se a taxa é cobrada ao mês, o tempo estará em meses).</p><p>No caso de juros compostos, temos que a taxa é cobrada sempre em cima do valor atual da aplicação, ou seja, é um tipo de operação onde há juros sobre juros. A fórmula do montante de uma operação a juros compostos é de M = C*(1+i)t, que por possuir o formato de uma função exponencial, tem seu gráfico dessa maneira.</p>',
      levelContent: 3,
      indexContent: 301
    },
    {
      nameContent: 'Pontos Distantes',
      textContent: '<p>A geometria analítica é uma área da matemática cujos estudos começaram com René Descartes, quando o mesmo sugeriu a união entre os estudos da álgebra e da geometria. Nessa área da geometria, todos os conceitos da geometria euclidiana podem ser aplicados juntos à álgebra. Sua principal característica é a utilização de um plano de coordenadas, conhecido como cartesiano, para a disposição de pontos, retas e figuras.</p><p>A distância entre dois pontos na geometria analítica é o menor segmento que liga ambos, sendo sempre uma reta. Para seu cálculo, deve-se calcular a diferença entre seus valores de x e de y, criando assim um triângulo retângulo que terá como catetos |xb-xa| e |yb-ya| e como hipotenusa a distância entre os dois pontos. Sabendo o valor dos catetos, encontra-se a distância entre os pontos através da fórmula de Pitágoras.</p>',
      levelContent: 3,
      indexContent: 302
    },
    {
      nameContent: 'Pontos Alinhados',
      textContent: '<p>A geometria analítica é uma área da matemática cujos estudos começaram com René Descartes, quando o mesmo sugeriu a união entre os estudos da álgebra e da geometria. Nessa área da geometria, todos os conceitos da geometria euclidiana podem ser aplicados juntos à álgebra. Sua principal característica é a utilização de um plano de coordenadas, conhecido como cartesiano, para a disposição de pontos, retas e figuras.</p><p>Para verificar se 3 pontos estão alinhados, é necessário calcular o determinante dos três pontos e verificar se não se chega a um absurdo por este cálculo. Calculando o determinante tendo dois pontos definidos e para o terceiro tendo uma de suas coordenadas (x ou y), podemos chegar em qual a coordenada necessária para o terceiro ponto estar alinhado aos outros dois.</p>',
      levelContent: 3,
      indexContent: 303
    },
    {
      nameContent: 'Média',
      textContent: '<p>A estatística é a ciência responsável por, principalmente, analisar dados, sendo considerada até mesmo uma área separada da matemática. É utilizada para descobrir alguma tendência ou característica de um agrupamento de indivíduos ou eventos. Suas principais medidas vistas no ensino médio são a média, moda e mediana.</p><p>A média é uma medida de tendência central calculada através da soma de todos os termos dividido pelo número total deles. É recomendada para casos em que os valores do conjunto de termos sejam próximos, sem grandes diferenças.</p>',
      levelContent: 3,
      indexContent: 304
    },
    {
      nameContent: 'Moda',
      textContent: '<p>A estatística é a ciência responsável por, principalmente, analisar dados, sendo considerada até mesmo uma área separada da matemática. É utilizada para descobrir alguma tendência ou característica de um agrupamento de indivíduos ou eventos. Suas principais medidas vistas no ensino médio são a média, moda e mediana.</p><p>A moda é uma medida de tendência central que representa o número que mais vezes se repete no conjunto de elementos analisado.</p>',
      levelContent: 3,
      indexContent: 305
    },
    {
      nameContent: 'Mediana',
      textContent: '<p>A estatística é a ciência responsável por, principalmente, analisar dados, sendo considerada até mesmo uma área separada da matemática. É utilizada para descobrir alguma tendência ou característica de um agrupamento de indivíduos ou eventos. Suas principais medidas vistas no ensino médio são a média, moda e mediana.</p><p>A mediana é uma medida de tendência central que representa o termo central do conjunto quando em ordem crescente. Em caso de conjuntos com quantidade de números pares, a mediana é a média entre os dois termos centrais.</p>',
      levelContent: 3,
      indexContent: 306
    },
  ]);
}
