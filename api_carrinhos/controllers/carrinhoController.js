const carrinhoModel = require('../models/carrinhoModel');

//APIS
const api_ingressos = require('../apis/api_ingressos');
const api_clientes = require('../apis/api_clientes');
//CRUD
exports.get = async (req, res) => {
    const carrinhos = await carrinhoModel.findAll();
    return res.status(200).json(carrinhos);
};

exports.getOne = async (req, res) => {
    const carrinho = await carrinhoModel.findOne({ where: { id: req.params.id } });
    return res.status(200).json(carrinho);
};

exports.post = async (req, res) => {

    const novoCarrinho = await carrinhoModel.create({
        idCliente: req.body.idCliente,
        idIngresso: req.body.idIngresso,
        quantidade: req.body.quantidade,
        valorTotal: req.body.valorTotal
    });

    return res.status(201).json(novoCarrinho);
};

exports.put = async (req, res) => {
    const carrinhoEncontrado = req.carrinhoEncontrado;

    await carrinhoEncontrado.save();

    return res.status(200).json(carrinhoEncontrado);
};

exports.delete = async (req, res) => {

    try {
        const carrinhoParaDestruir = await carrinhoModel.findOne({ where: { id: req.params.id } });
        await carrinhoParaDestruir.destroy();

        return res.status(200).send(`Carrinho ${req.params.id} destruido com sucesso!`);
    } catch (err) {
        return res.status(404).send(`Carrinho não existe!`);
    }

};


//Validações

exports.validacaoPost = async (req, res, next) => {
    try {
        const ingresso = await api_ingressos.get(`/${req.body.idIngresso}`)
        if (!ingresso.data) {
            return res.status(404).send('Ingresso não existe');
        } else if (parseInt(ingresso.data.estoque) < parseInt(req.body.quantidade)) {
            return res.status(406).send(`Você quer comprar ${req.body.quantidade} ingressos mas  só sobraram ${ingresso.data.estoque}!`);
        }

        const cliente = await api_clientes.get(`/${req.body.idCliente}`);

        if (!cliente.data) {
            return res.status(404).send('Cliente não existe');
        }

        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send('Erro interno')
    }

    if (!req.body.idCliente) {
        return res.status(422).send('Está faltando o campo idCliente');
    } else if (!req.body.idIngresso) {
        return res.status(422).send('Está faltando o campo idIngresso');
    } else if (!req.body.quantidade) {
        return res.status(422).send('Está faltando o campo quantidade');
    } else if (!req.body.valorTotal) {
        return res.status(422).send('Está faltando o campo valorTotal');
    }
};

exports.validacaoPut = async (req, res, next) => {

    try {
        const carrinhoEncontrado = await carrinhoModel.findOne({ where: { id: req.params.id } })
        const ingresso = await api_ingressos.get(`/${carrinhoEncontrado.dataValues.idIngresso}`)
        if (!ingresso.data) {
            return res.status(404).send('Ingresso não existe');
        }

        const cliente = await api_clientes.get(`/${carrinhoEncontrado.dataValues.idCliente}`);

        if (!cliente.data) {
            return res.status(404).send('Cliente não existe');
        }

        if (req.body.idCliente) {
            carrinhoEncontrado.idCliente = req.body.idCliente
        }
        if (req.body.idIngresso) {
            carrinhoEncontrado.idIngresso = req.body.idIngresso
        }
        if (req.body.quantidade) {
            carrinhoEncontrado.quantidade = req.body.quantidade
            if (parseInt(ingresso.data.estoque) < parseInt(req.body.quantidade)) {
                return res.status(406).send(`Você quer comprar ${req.body.quantidade} ingressos mas  só sobraram ${ingresso.data.estoque}!`);
            }
        }
        if (req.body.valorTotal) {
            carrinhoEncontrado.valorTotal = req.body.valorTotal
        }

        if (!carrinhoEncontrado) {
            return res.status(404).send('Carrinho não encontrado!');
        }

        req.carrinhoEncontrado = carrinhoEncontrado
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).send('Erro interno')
    }
};

