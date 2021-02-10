const express = require("express");
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: 'mysql://root:@localhost:3306/delilah'});
const usuariosController = require('../controllers/usuarios.controllers');

router.get('/usuarios', usuariosController.getUsuarios)

//router.get('/usuarios/:id', usuariosController.getAlbumById)

router.post('/usuarios', usuariosController.newUsuario)

router.post("/usuario/:id/favoritos/:producto",usuariosController.favoritos)

//router.put('/:id', upload.single('nombre'), usuariosController.updateAlbum)

router.delete('/usuarios/:id', usuariosController.deleteUsuario)


module.exports = router

