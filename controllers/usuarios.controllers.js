const sequelize = require('../conexion')
let jwt = require('jsonwebtoken');

let getUsuarios =  async (req, res) => {
    const query = 'SELECT * FROM usuarios';
    try {
      const u = await sequelize.query(query, {type:sequelize.QueryTypes.SELECT});
      res.json(u);
    } catch(e) {
      console.log(e);
    }
  };

let newUsuario = async(req, res) => {
    const query = 'INSERT INTO usuarios (usuario, Nombres, correo, telefono, direccion, contrasena, id_role) VALUES (?,?,?,?,?,?,?)';
    try {
      const {usuario, nombres, correo, telefono, direccion, contrasena, id_role} = req.body;
      await sequelize.query(query, {
        replacements: [
          usuario, nombres, correo, telefono, direccion, contrasena, id_role
        ]
      }).then((response)=>{
        res.send({mensaje: 'enviado', usuario: req.body});
      })
    } catch(e) {
      console.log(e);
      res.status(400);
    }
  };

let deleteUsuario = async (req,res)=>{
    const id = req.query.id_usuario;
    const query = 'DELETE FROM usuarios WHERE id_usuario= ?';
    try{
    sequelize.query(query, {
      replacements:[id]
    }).then((data => {
      res.send({status: 'eliminado'});
    }))}
    catch(e){
      res.status(400);
      console.log(e)
    }
  };

/*app.get("/usuario/:id/favoritos", (req, res) => {
    res.send({
      favoritos: favoritos,
    });
  });*/
  
/*let favoritos = async (req, res) => {
    idUsuario = req.params.id;
    idProducto = req.params.inventoryItem;
    
    for (let i = 0; i < productos.length; i++) {
      if (idProducto == inventoryItem[i].id) {
        // usuario.favoritos.push(productos[i]);
        usuario.favoritos.push(productos[i]);
        res.send({
          message: "Favorito nuevo agregado",
          nuevoFavorito: productos[i],
        });
      }
    }
  };*/
  
let loginUsuario = async(req, res) => {
    let clave = "marcos21";
    let { correo, contrasena } = req.body;
    console.log('estoy aqui')
    try{
      const query = `SELECT * FROM usuarios
    where correo =? and 
    contrasena = ? LIMIT 1`;
      let result = await sequelize.query(query,{replacements:[correo, contrasena]
      })
      console.log(result);
      console.log(result.length);
      if (result !== 0) {
        
        let token = jwt.sign({correo: result.correo, tipo: result.id_role}, clave);
        
        res.status(200).json({msj: 'usuario loggeado', token: token})
      } 
    }
    catch (e){
      console.log(e);
      res.status(401).send("usuario incorrecto");
    }
  };

  exports.getUsuarios = getUsuarios;
  exports.newUsuario = newUsuario;
  exports.deleteUsuario = deleteUsuario;
  exports.loginUsuario = loginUsuario;
  //exports.favoritos = favoritos;