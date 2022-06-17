const express = require('express');
const router = express.Router();

// Controllers
const ingressos = require('../controllers/ingressoController');

//Rotas Ingressos
router.get('/', ingressos.get);

router.get('/:id', ingressos.getOne);

router.post('/',ingressos.validacaoPost, ingressos.post);

router.put('/:id', ingressos.validacaoPut, ingressos.put);

router.delete('/:id', ingressos.delete);

module.exports = router;