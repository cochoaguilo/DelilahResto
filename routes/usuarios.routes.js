const express = require("express");
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'mysql://root:@localhost:3306/delilah'});
const usuariosController = require('../controllers/usuarios.controllers');
const middleware = require('../middleware')

router.get('/',middleware.autentificarAdmin, usuariosController.getUsuarios)

router.post('/', usuariosController.newUsuario)

router.post('/login',usuariosController.loginUsuario)

//router.post("/usuario/:id/favoritos/:producto",usuariosController.favoritos)

router.put('/:id', middleware.autentificarAdmin, usuariosController.updateUsuario)

router.delete('/:id',middleware.autentificarAdmin, usuariosController.deleteUsuario)


module.exports = router

