const express = require("express");
const app = express();
const port = 3500;
const cors = require('cors');
const helmet = require('helmet')

//let expressjwt = require('express-jwt')
const sequelize = require('./conexion');
const bodyParser = require("body-parser");


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));

const autentificarAdmin = require('./middleware')
app.use(cors());
app.use(helmet());

// /usuarios
const usuariosRoutes = require('./routes/usuarios.routes');

// /pedidos
const pedidosRoutes = require('./routes/pedidos.routes');

// /productos
const productosRoutes = require('./routes/productos.routes')

app.use('/usuarios',usuariosRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/productos',  productosRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
