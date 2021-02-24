const sequelize = require('../conexion');
const jwt = require("jsonwebtoken");

let getPedidos = async(req, res) => {
  const query = 'SELECT * FROM pedidos';
  try {
    const pedidos = await sequelize.query(query, {type:sequelize.QueryTypes.SELECT});
    res.json(pedidos).status(201);
  } catch(e) {
    console.log(e);
  }
  };
  
let nuevoPedido = async (req, res) => {
    
    const query = 'INSERT INTO pedidos (id_status, id_metodo, Direccion, id_usuario, id_producto) VALUES (?,?,?,?,?)';
    let { id_status, id_metodo, Direccion, id_usuario, id_producto } = req.body;
    try {
      await sequelize.query(query, {
        replacements: [
          id_status, id_metodo, Direccion, id_usuario, id_producto
        ]
      }).then((response)=>{
        res.send({mensaje: 'enviado', producto: req.body});
      })
    } catch(e) {
      console.log(e);
    }
   
    
  };
let deletePedido = async(req, res)=>{
    const query = 'DELETE FROM pedidos WHERE id_pedido=?';
    const id = req.query.id;
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

  const updatePedido = async (req, res) =>{
    const { status, metodo, direccion, usuario, producto } = req.body

    try {
        const result = await sequelize.query(`UPDATE pedidos 
        SET id_status = "${status}",  
        id_metodo = "${metodo}", Direccion = "${direccion}",
        id_usuario = "${usuario}", id_producto = "${producto}"   
        WHERE id_pedido = ${req.params.id}`,
        { type: sequelize.QueryTypes.INSERT })

        console.log(result)
        res.status(204).json({
            message: 'pedido actulizado'
    })

    } catch (error) {
        console.log(`error en la inserción ${error}`)
    }
}

exports.nuevoPedido = nuevoPedido;
exports.getPedidos = getPedidos;
exports.deletePedido = deletePedido;
exports.updatePedido = updatePedido;