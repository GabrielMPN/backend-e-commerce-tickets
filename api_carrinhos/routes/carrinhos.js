const express = require('express');
const router = express.Router();

// Controllers
const carrinhos = require('../controllers/carrinhoController');

//Rotas Carrinho
router.get('/', carrinhos.get);

router.get('/:id', carrinhos.getOne);

router.post('/', carrinhos.validacaoPost, carrinhos.post);

router.put('/:id', carrinhos.validacaoPut, carrinhos.put);

router.delete('/:id', carrinhos.delete);

module.exports = router;