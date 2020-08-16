import knex from 'knex'


// server para realizar alteracoes no banco de dados
export async function up (knex: knex){
    return knex.schema.createTable('class_schedule',table =>{
        table.increments('id').primary();
       
        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();
        
        //Criando relacionamento com a tabela usuário
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')// para refletir alteracao em todas as tabeas referenciadas
            .onDelete('CASCADE'); // para deletar todas as aulas do professor
    });
}

// desfaz alteracao no banco
export async function down (knex: knex){
    return knex.schema.dropTable('class_schedule');
}