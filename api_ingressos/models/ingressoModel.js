const Sequelize = require('sequelize');
const db = require('../connection').sequelize;

const ingresso = db.define('tb_ingressos', {
    nome: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    estoque: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
});

module.exports = ingresso;