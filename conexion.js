const Sequelize = require('sequelize');
const path = 'mysql://root:@localhost:3306/delilah';
const sequelize = new Sequelize(path, {
    operatorsAliases: false ,
    logging: false,
    password: '47232465'
});

sequelize.authenticate().then(() => {
    console.log('Conectado.');
}).catch(err => {
    console.error('Error de conexion:', err);
})

module.exports = sequelize;