import {Knex} from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('users', (table : any) => {
    table.increments('idUser').primary();
    table.string('nameUser', 200).notNullable();
    table.string('emailUser', 100).notNullable();
    table.string('keyUser', 32).notNullable();
    table.integer('levelUser', 1).notNullable();
    table.boolean('isAdminUser',false).notNullable();
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('users');
}
