const ingressoModel = require('../models/ingressoModel');
const validator = require('validator');


//CRUD
exports.get = async (req, res) => {
    const ingressos = await ingressoModel.findAll();
    return res.status(200).json(ingressos);
};

exports.getOne = async (req, res) => {
    const ingresso = await ingressoModel.findOne({ where: { id: req.params.id } });
    return res.status(200).json(ingresso);
};

exports.post = async (req, res) => {

    const novoIngresso = await ingressoModel.create({
        nome: req.body.nome,
        estoque: req.body.estoque,
        valor: req.body.valor,
    });

    return res.status(201).json(novoIngresso);
};

exports.put = async (req, res) => {
    const ingressoEncontrado = req.ingressoEncontrado;
    await ingressoEncontrado.save();

    return res.status(200).json(ingressoEncontrado);
};

exports.delete = async (req, res) => {
    try {
        const ingressoParaDestruir = await ingressoModel.findOne({ where: { id: req.params.id } });
        await ingressoParaDestruir.destroy();

        return res.status(200).send(`Ingresso ${req.params.id} destruido com sucesso!`);
    } catch (err) {
        return res.status(404).send(`Ingresso não existe!`);
    }

};



//Validações

exports.validacaoPut = async (req, res, next) => {

    const ingressoEncontrado = await ingressoModel.findOne({ where: { id: req.params.id } })

    if (!ingressoEncontrado) {
        return res.status(404).send('Ingresso não encontrado!');
    }

    if (req.body.nome) {
        ingressoEncontrado.nome = req.body.nome;
    }
    if (req.body.estoque) {
        ingressoEncontrado.nome = req.body.estoque;
    }
    if (req.body.valor) {
        ingressoEncontrado.nome = req.body.valor;
    }


    req.ingressoEncontrado = ingressoEncontrado
    next();
};

