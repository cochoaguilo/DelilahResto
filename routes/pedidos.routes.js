const express = require("express");
const router = express.Router();
const port = 3500;
let jwt = require("jsonwebtoken");
const multer = require('multer');
const upload = multer({dest: 'mysql://root:@localhost:3306/delilah'})
const pedidosController = require('../controllers/pedidos.controllers');
const middleware = require('../middleware');

router.get('/pedidos', middleware.autentificarAdmin, pedidosController.getPedidos);

//router.get('/pedidos/:id', pedidosController.)

router.post('/pedidos', middleware.autentificarUser, pedidosController.nuevoPedido);


//router.put('/:id', pedidosController.)

router.delete('/pedidos/:id', middleware.autentificarAdmin, pedidosController.deletePedido);


module.exports = router
