const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'mysql://root:@localhost:3306/delilah'});
const productosController = require('../controllers/productos.controllers');
const middleware = require('../middleware')

router.get('/', middleware.autentificarUser, productosController.getProductos)

router.get('/:id', middleware.autentificarUser, productosController.getProductoById)

router.post('/', middleware.autentificarAdmin , productosController.nuevoProducto)


//router.put('/:id', upload.single('nombre'), productosController.updateAlbum)

router.delete('/:id', middleware.autentificarAdmin, productosController.deleteProducto)


module.exports = router


