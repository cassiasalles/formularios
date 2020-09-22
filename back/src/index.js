const express = require('express');
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express();

// conectanto com o banco de dados
mongoose.connect('mongodb+srv://cassiaADM:cassiaADM@cluster.flurr.mongodb.net/formulario?retryWrites=true&w=majority', {
    // ignorando warns
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// habilitando a leitura json
app.use(express.json());
// importando as rotas
app.use(routes);

// definindo a porta
app.listen(3333);