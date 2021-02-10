const express = require("express");
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'mysql://root:@localhost:3306/delilah'});
const productosController = require('../controllers/productos.controllers');

router.get('/', productosController.getProductos)

//router.get('/productos/:id', productosController.)

router.post('/productos', productosController.nuevoProducto)


//router.put('/:id', upload.single('nombre'), productosController.updateAlbum)

router.delete('/producto/:id', productosController.deleteProducto)


module.exports = router


