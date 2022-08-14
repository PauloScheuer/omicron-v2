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
    },
    {
      nameField: 'a',
      invisibleField: true,
      idContent: 3,
    },
    {
      nameField: 'n',
      invisibleField: false,
      idContent: 3,
    },
    {
      nameField: 'p',
      invisibleField: false,
      idContent: 3,
    },
    {
      nameField: 'C',
      invisibleField: true,
      idContent: 4,
    },
    {
      nameField: 'n',
      invisibleField: false,
      idContent: 4,
    },
    {
      nameField: 'p',
      invisibleField: false,
      idContent: 4,
    },
    {
      nameField: 'J',
      invisibleField: false,
      idContent:5
    },
    {
      nameField: 'C',
      invisibleField: false,
      idContent:5
    },
    {
      nameField: 'i',
      invisibleField: false,
      idContent:5
    },
    {
      nameField: 't',
      invisibleField: false,
      idContent:5
    },
    {
      nameField: 'M',
      invisibleField: false,
      idContent:6
    },
    {
      nameField: 'C',
      invisibleField: false,
      idContent:6
    },
    {
      nameField: 'i',
      invisibleField: false,
      idContent:6
    },
    {
      nameField: 't',
      invisibleField: false,
      idContent:6
    },
  ]);
}
