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

const getProductoById = async (req, res) =>{
    try {
        const result = await sequelize.query(`SELECT * FROM productos 
        WHERE id_producto = ${req.params.id}`, 
        {type: sequelize.QueryTypes.SELECT})

        console.log(result)
        res.status(200).json({result})
    } catch (error) {
        console.log(`error en la inserción ${error}`)
    }
    
}
  
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
    const query = `DELETE FROM productos WHERE id_producto= ${req.params.id}`;
    try{
      let result = await sequelize.query(query);
      res.status(204).json({
        mensaje: 'producto eliminado',
        result
      })
    }catch(e){
      console.log(e);
    }
  
  };

  const updateProducto = async (req, res) =>{
    const { name, precio } = req.body

    try {
        const result = await sequelize.query(`UPDATE productos 
        SET name = "${name}",  
        precio = "${precio}" 
        WHERE id_producto = ${req.params.id}`,
        { type: sequelize.QueryTypes.INSERT })

        console.log(result)
        res.status(204).json({
            message: 'producto actulizado'
    })

    } catch (error) {
        res.status(401).json({
          message: 'producto no encontrado'
        })
        console.log(`error en la inserción ${error}`)
    }
}

exports.getProductos = getProductos;
exports.nuevoProducto = nuevoProducto;
exports.deleteProducto = deleteProducto;
exports.getProductoById = getProductoById;
exports.updateProducto = updateProducto;