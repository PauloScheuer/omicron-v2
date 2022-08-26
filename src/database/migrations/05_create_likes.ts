import {Knex} from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('likes', (table : any) => {
    table.increments('idLike').primary();
    table.dateTime('whenLike').notNullable();
    table.integer('idUser').notNullable().references('idUser').inTable('users');
    table.integer('idQuestion').references('idQuestion').inTable('questions');
    table.integer('idAnswer').references('idAnswer').inTable('answers');
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('likes');
}
