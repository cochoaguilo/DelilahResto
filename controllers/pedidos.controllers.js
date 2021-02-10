const sequelize = require('../conexion');

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
    let idPedido = req.params.id;
    
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

exports.nuevoPedido = nuevoPedido;
exports.getPedidos = getPedidos;
exports.deletePedido = deletePedido;