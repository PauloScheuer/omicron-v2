import {Knex} from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('answers', (table : any) => {
    table.increments('idAnswer').primary();
    table.string('textAnswer', 1000).notNullable();
    table.dateTime('whenAnswer').notNullable();
    table
      .integer('idQuestion')
      .notNullable()
      .references('idQuestion')
      .inTable('questions');
    table.integer('idUser').notNullable().references('idUser').inTable('users');
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('answers');
}
