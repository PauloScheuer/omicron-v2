import {Knex} from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('questions', (table : any) => {
    table.increments('idQuestion').primary();
    table.string('titleQuestion', 100).notNullable();
    table.string('textQuestion', 600).notNullable();
    table.dateTime('whenQuestion').notNullable();
    table.integer('idUser').notNullable().references('idUser').inTable('users');
    table
      .integer('idContent')
      .notNullable()
      .references('idContent')
      .inTable('contents');
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('questions');
}
