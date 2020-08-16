import knex from 'knex'


// server para realizar alteracoes no banco de dados
export async function up (knex: knex){
    return knex.schema.createTable('classes',table =>{
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();
        
        //Criando relacionamento com a tabela usuário
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')// para refletir alteracao em todas as tabeas referenciadas
            .onDelete('CASCADE'); // para deletar todas as aulas do professor
            
    });
}

// desfaz alteracao no banco
export async function down (knex: knex){
    return knex.schema.dropTable('classes');
}