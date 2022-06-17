const express = require('express');
const router = express.Router();

// Controllers
const clientes = require('../controllers/clienteController');

//Rotas Clientes
router.get('/', clientes.get);

router.get('/:id', clientes.getOne);

router.post('/', clientes.post);

router.put('/:id', clientes.validacaoPut, clientes.put);

router.delete('/:id', clientes.delete);

module.exports = router;