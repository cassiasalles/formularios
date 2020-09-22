const { Router } = require('express');

const UserController = require('./controllers/UserController');
const AuthenticateController = require('./controllers/AuthenticateController');
const CreateFormController = require('./controllers/CreateFormController');
const ListFormsControlles = require("./controllers/FormsListController")
const AnswerFormsControlles = require("./controllers/AnswerFormController");
const AnswerListControlles = require("./controllers/AnswerListController");

const routes = Router();

// rota para cadastrar um usuario
routes.post('/users', UserController.store);

// rota para autenticação
routes.post('/authenticate', AuthenticateController.index)

// rota para criar formulário
routes.post('/create', CreateFormController.store)

// rota para listar os formularios
routes.get('/listforms', ListFormsControlles.index)

// rota para responder formulário
routes.post('/answerform', AnswerFormsControlles.store)

// rota para listar resposta de um formulário
routes.post('/answerlist', AnswerListControlles.index)


module.exports = routes;
