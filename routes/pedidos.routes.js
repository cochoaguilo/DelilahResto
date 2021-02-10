const express = require("express");
const router = express.Router();
const port = 3500;
let jwt = require("jsonwebtoken");
const multer = require('multer');
const upload = multer({dest: 'mysql://root:@localhost:3306/delilah'})
const pedidosController = require('../controllers/pedidos.controllers');

router.get('/pedidos', pedidosController.getPedidos)

//router.get('/pedidos/:id', pedidosController.)

router.post('/pedidos', pedidosController.nuevoPedido)


//router.put('/:id', pedidosController.)

router.delete('/pedidos/:id', pedidosController.deletePedido)


module.exports = router
