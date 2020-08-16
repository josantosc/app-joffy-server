import knex from 'knex'


// server para realizar alteracoes no banco de dados
export async function up (knex: knex){
    return knex.schema.createTable('connections',table =>{
        table.increments('id').primary();
        
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE') // para deletar todas as aulas do professor
            .onDelete('CASCADE');// para refletir alteracao em todas as tabeas referenciadas

            // para verificar quando a conexao foi feita
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
            
    });
}

// desfaz alteracao no banco
export async function down (knex: knex){
    return knex.schema.dropTable('connections');
}