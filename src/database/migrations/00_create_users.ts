import knex from 'knex'


// server para realizar alteracoes no banco de dados
export async function up (knex: knex){
    return knex.schema.createTable('users',table =>{
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
    });
}

// desfaz alteracao no banco
export async function down (knex: knex){
    return knex.schema.dropTable('users');
}