import express from 'express'
import ClassesControler from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router(); // modulo de roteamento do express
const classesControllers = new ClassesControler()
const connectionsController = new ConnectionsController()
// para criar aulas
routes.get('/classes',classesControllers.index);
routes.post('/classes',classesControllers.create);

routes.get('/connections',connectionsController.index);
routes.post('/connections',connectionsController.create);


export default routes;