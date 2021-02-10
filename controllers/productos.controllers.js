const sequelize = require('../conexion');

let getProductos =  async(req, res) => {
  
    const query = 'SELECT * FROM productos';
    
    try {
      const u = await sequelize.query(query, {type:sequelize.QueryTypes.SELECT});
      res.json(u);
    } catch(e) {
      console.log(e);
    }
  };
  
let nuevoProducto = async(req, res) => {
    const query = 'INSERT INTO productos (name, precio) VALUES (?,?)';
    let { name, precio } = req.body;
    try {
      await sequelize.query(query, {
        replacements: [
          name, precio
        ]
      }).then((response)=>{
        res.send({mensaje: 'enviado', producto: req.body});
      })
    } catch(e) {
      console.log(e);
    }
  };
  
let deleteProducto =  async(req, res)=>{
    const query = 'DELETE FROM productos WHERE id_producto=?';
    const id = req.params.id;
    try{
      await sequelize.query(query, {
        replacements: [id]
      }).then(data =>{
        res.send({status: 'eliminado'});
      });
    }catch(e){
      console.log(e);
    }
  
  };

exports.getProductos = getProductos;
exports.nuevoProducto = nuevoProducto;
exports.deleteProducto = deleteProducto;