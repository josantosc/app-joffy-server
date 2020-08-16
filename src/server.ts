import express from 'express';
import cors from 'cors';
import routes from './routes'; // importando rotas do arquivo routes

//Criando variavel de ponto de partida das rotas
const app = express();

//Criando rota para lista de usuários
app.use(cors());
app.use(express.json());
app.use(routes); // chamando rotas

// Para ouvir requisicao HTTP, endereco da API localhost:3333
//app.listen(3333);
app.listen(process.env.PORT || 3333)