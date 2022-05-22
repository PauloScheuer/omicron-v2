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
  ]);
}
