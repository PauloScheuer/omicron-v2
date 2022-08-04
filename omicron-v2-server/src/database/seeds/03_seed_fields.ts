import {Knex} from 'knex';

// A função seed insere uma ou mais entradas na tabela definida. É executada quando o comando db-s for rodado no terminal
export async function seed(knex: Knex) {
  await knex('fields').insert([
    {
      nameField: 'y',
      invisibleField: false,
      idContent: 1
    },
    {
      nameField: 'a',
      invisibleField: false,
      idContent: 1
    },
    {
      nameField: 'x',
      invisibleField: false,
      idContent: 1
    },
    {
      nameField: 'b',
      invisibleField: false,
      idContent: 1
    },
    {
      nameField: 'x',
      invisibleField: true,
      idContent: 2
    },
    {
      nameField: 'a',
      invisibleField: false,
      idContent: 2
    },
    {
      nameField: 'b',
      invisibleField: false,
      idContent: 2
    },
    {
      nameField: 'c',
      invisibleField: false,
      idContent: 2
    }
  ]);
}
