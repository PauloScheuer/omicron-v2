import {Knex} from 'knex';
import crypto from 'crypto';

const dataCipher = {
  alg: 'aes256',
  secret: 'keys',
};

const toCrypt = (word: String) => {
  const cipher = crypto.createCipher(dataCipher.alg, dataCipher.secret);
  const strWord = String(word);
  cipher.update(strWord);
  return cipher.final('hex');
};

// A função seed insere uma ou mais entradas na tabela definida. É executada quando o comando db-s for rodado no terminal
export async function seed(knex: Knex) {
  await knex('users').insert([
    {
      nameUser: 'Paulo Roberto Scheuer Gomes',
      emailUser: 'pauloroberto.scheuergomes.404@gmail.com',
      keyUser: `${toCrypt('1')}`,
      levelUser: 4,
      isAdminUser: true
    },
    {
      nameUser: 'Paulo Roberto Scheuer Gomes - 2',
      emailUser: 'pauloroberto.scheuergomes.404@gmail.com2',
      keyUser: `${toCrypt('2')}`,
      levelUser: 4,
      isAdminUser: true
    },
  ]);
}
