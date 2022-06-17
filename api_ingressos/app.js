const express = require('express');
const app = express();
const porta = 3003;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rotas
const ingressos = require('./routes/ingressos.js');
app.use('/ingressos', ingressos);

//Atualiza as tabelas caso haja alguma alteração ou cria caso não exista
const db = require('./connection').db;
db.attTables();


app.listen(porta, () => {
  console.log('servidor rodando na porta: ' + porta)
});