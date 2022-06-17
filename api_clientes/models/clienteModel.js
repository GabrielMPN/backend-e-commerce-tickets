const Sequelize = require('sequelize');
const db = require('../connection').sequelize;

const cliente = db.define('tb_clientes', {
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    senha: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
});

module.exports = cliente;