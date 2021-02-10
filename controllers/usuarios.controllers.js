const sequelize = require('../conexion')

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
    const query = 'INSERT INTO usuarios (usuario, Nombres, correo, telefono, direccion, contraseña, admin) VALUES (?,?,?,?,?,?,?)';
    try {
      const {usuario, nombres, correo, telefono, direccion, contraseña, admin} = req.body;
      await sequelize.query(query, {
        replacements: [
          usuario, nombres, correo, telefono, direccion, contraseña, admin
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
  
let favoritos = async (req, res) => {
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
  };

let loginUsuario = async(req, res) => {
    const query = 'SELECT nombre and pass FROM usuarios';
    let { nombre, pass } = req.body;
    try{
    usuarios.find((usuario) => {
      if (nombre == usuario.nombre && pass == usuario.pass && email) {
        let obj = {
          id: usuario.id,
          nombre: usuario.nombre,
        };
  
        let token = jwt.sign(obj, clave);
  
        res.send(token);
      } 
    })
  }
    catch {
      res.status(401).send("usuario incorrecto");
    };
  };

  exports.getUsuarios = getUsuarios;
  exports.newUsuario = newUsuario;
  exports.deleteUsuario = deleteUsuario;
  exports.loginUsuario = loginUsuario;
  exports.favoritos = favoritos;