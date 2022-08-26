import {Knex} from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('discovers', (table : any) => {
    table.increments('idDiscover').primary();
    table.string('nameDiscover',100).notNullable();
    table.string('textDiscover',2000).notNullable();
    table.string('imgDiscover',100);
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('discovers');
}
