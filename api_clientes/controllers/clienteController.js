const clienteModel = require('../models/clienteModel');
const validator = require('validator');


//CRUD
exports.get = async (req, res) => {
    const clientes = await clienteModel.findAll();
    return res.status(200).json(clientes);
};

exports.getOne = async (req, res) => {
    const cliente = await clienteModel.findOne({ where: { id: req.params.id } });
    return res.status(200).json(cliente);
};

exports.post = async (req, res) => {
    const novoCliente = await clienteModel.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha
    });

    return res.status(201).json(novoCliente);
};

exports.put = async (req, res) => {
    const clienteEncontrado = req.clienteEncontrado;
    await clienteEncontrado.save();

    res.status(200).json(clienteEncontrado);
};

exports.delete = async (req, res) => {
    try {
        const clienteParaDestruir = await clienteModel.findOne({ where: { id: req.params.id } });
        await clienteParaDestruir.destroy();

        return res.status(200).send(`Cliente ${req.params.id} destruido com sucesso!`);
    } catch (err) {
        return res.status(404).send(`Cliente não existe!`);
    }

};



//Validações

exports.validacaoPost = async (req, res, next) => {
    const cliente = await clienteModel.findOne({ where: { email: req.body.email } });

    if (cliente) {
        return res.status(203).send('E-mail já existe!');
    }

    next();
}

exports.validacaoPut = async (req, res, next) => {

    const clienteEncontrado = await clienteModel.findOne({ where: { id: req.params.id } })

    if (!clienteEncontrado) {
        return res.status(404).send('Cliente não encontrado!');
    }

    if (req.body.nome) {
        clienteEncontrado.nome = req.body.nome
    }
    if (req.body.email) {
        clienteEncontrado.email = req.body.email
    }
    if (req.body.senha) {
        clienteEncontrado.senha = req.body.senha
    }

    req.clienteEncontrado = clienteEncontrado
    next();
};


