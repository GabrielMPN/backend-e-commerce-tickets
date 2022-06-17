const express = require('express');
const app = express();
const porta = 3002;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Rotas
const carrinhos = require('./routes/carrinhos.js');
app.use('/carrinhos', carrinhos);

//Atualiza as tabelas caso haja alguma alteração ou cria caso não exista
const db = require('./connection').db;
db.attTables();


app.listen(porta, () => {
  console.log('servidor rodando na porta: ' + porta)
});