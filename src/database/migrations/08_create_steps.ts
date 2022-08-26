import {Knex} from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('steps', (table : any) => {
    table.increments('idStep').primary();
    table.string('textStep',50).notNullable();
    table.integer('orderStep',2).notNullable();
    table.string('hintStep',100);
    table.boolean('evaluateStep');
    table.boolean('notShowStep');
    table.boolean('replaceStep');
    table.integer('idField').notNullable().references('idField').inTable('fields');
  });
}
export async function down(knex: Knex) {
  return knex.schema.dropTable('steps');
}
