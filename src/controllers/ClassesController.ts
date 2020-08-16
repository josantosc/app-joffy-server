
import { Request, Response } from 'express'
import db from '../database/connection';
import converteHourToMinutes from '../utils/convertHourToMinutes';

interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesControler{

//metodo para retornar listagem (select)
async index(request: Request, response: Response){
    const filters = request.query;

    //setando variais como strings
    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string

    if (!filters.week_day || !filters.subject || !filters.time){

         return response.status(400).json({
            error: 'Missing filters to seatch classes'
        });
}

// convertendo hora e minutos para retornar lista
const timeInMinutes = converteHourToMinutes(time);
console.log(timeInMinutes);

//criando where da disciplina e todas as informaceos da displina
const classes = await db('classes')
    //subquery para verificar se existe horário disponivel
    .whereExists(function(){
        this.select('class_schedule.*')
            .from('class_schedule')
            //Where para buscar id da classe que o usuário for selecionar
            .whereRaw('class_schedule.class_id = classes.id')
            //Where para buscardia da semana for igual ao dia da busca do usuário
            .whereRaw('class_schedule.week_day = ??', [Number(week_day)])

            // Where parbuscar somente horário estabelecido na tebala schedule
            .whereRaw('class_schedule.from <= ??',[timeInMinutes])
            .whereRaw('class_schedule.to > ??',[timeInMinutes])

    })
    .where('classes.subject', '=' , subject)
    .join('users','classes.user_id', '=', 'users.id')
    .select(['classes.*', 'users.*']);
return response.json(classes);

}

// metodo para criar classes
async create (request: Request, response: Response){
    const {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    }
     = request.body; // recebendo dados pelo corpo da requisicao

     // criando variavé de transacao para otimizar as operacoes no banco
     const trx = await db.transaction();
try{


     // criando variavel dos usuários inseridos
     const insertedUsersIds =  await trx('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
    }).returning('id');

    // Pegando primeiro usuári inserido
    const user_id = insertedUsersIds[0];


    // criando variavel que retorna funcao das classe criada
    const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id, // pegando usuário id

    }).returning('id');

    const class_id = insertedClassesIds[0]; // obtendo primeira classe criada
    
    //criando variavel para converter hora em minutos
    const classSchedule = schedule.map((scheduleItem: ScheduleItem)=>{
        
        return {
                class_id,
                week_day: scheduleItem.week_day,
                from: converteHourToMinutes(scheduleItem.from),
                to: converteHourToMinutes(scheduleItem.to),

        };
    })

   
await trx('class_schedule').insert(classSchedule);

await trx.commit();

return response.status(201).send() //enviar informacoes

}
    
catch (err){
    await trx.rollback();
    console.log(err);
    response.status(400).json({
        error: 'Unexpected error while creating new class'
    })
    }

}

}