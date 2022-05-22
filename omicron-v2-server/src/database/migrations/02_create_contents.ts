import {Knex} from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('contents', (table : any) => {
    table.increments('idContent').primary();
    table.string('nameContent', 100).notNullable();
    table.string('textContent', 2000).notNullable();
    table.integer('levelContent', 1).notNullable();
    table.integer('indexContent').notNullable();
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('contents');
}
