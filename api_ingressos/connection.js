require('dotenv').config();
const Sequelize = require('sequelize');

exports.sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
});

exports.db = {
    async attTables() {
        console.log("Sincronizando modelos...")
        await exports.sequelize.sync() //Cria tabelas caso não exista
        await exports.sequelize.sync({ alter: true }) //Atualiza tabelas que foram modificadas
        console.log("Modelos sincronizados.")
    }
}