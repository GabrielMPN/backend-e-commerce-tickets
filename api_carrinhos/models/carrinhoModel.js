const Sequelize = require('sequelize');
const db = require('../connection').sequelize;

const carrinho = db.define('tb_carrinhos', {
    idCliente: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idIngresso: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valorTotal: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
});

module.exports = carrinho;