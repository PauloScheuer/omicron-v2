import {Knex} from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('fields', (table : any) => {
    table.increments('idField').primary();
    table.string('nameField').notNullable();
    table.boolean('invisibleField').notNullable();
    table.integer('idContent').notNullable().references('idContent').inTable('contents');
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('fields');
}
