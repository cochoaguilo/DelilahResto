const sequelize = require('../conexion')
let jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//const myPlaintextPassword = 's0/\/\P4$$w0rD';
//const someOtherPlaintextPassword = 'not_bacon';


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
      const hashedPassword = await bcrypt.hash(contrasena,saltRounds);
      await sequelize.query(query, {
        replacements: [
          usuario, nombres, correo, telefono, direccion, hashedPassword, id_role
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

const updateUsuario = async (req, res) =>{
    const { id,usuario, Nombres, correo, telefono, direccion, contrasena, id_role } = req.body

    try {
        const result = await sequelize.query(`UPDATE usuarios 
        SET usuario = "${usuario}",  
        Nombres = "${Nombres}" ,
        correo = "${correo}",
        telefono = "${telefono}",
        direccion = "${direccion}",
        contrasena = "${contrasena}",
        id_role = "${id_role}"
        WHERE id_usuario = ${id}`,
        { type: sequelize.QueryTypes.INSERT })

        console.log(result)
        res.status(204).json({
            message: 'usuario actulizado'
    })

    } catch (error) {
        res.status(401).json({
          message: 'usuario no encontrado'
        })
        console.log(`error en la inserción ${error}`)
    }
}
  
let loginUsuario = async(req, res) => {
    let clave = "marcos21";
    const { correo, contrasena } = req.body;
    
    try{
      const query = `SELECT * FROM usuarios
    WHERE correo = ? LIMIT 1`;
      
      let result = await sequelize.query(query,{replacements:[correo],
        type:sequelize.QueryTypes.SELECT
      });
      console.log(result);
      if(result.length ==0){
        res.send("usuario incorrecto");
        //console.log(result);
      }
      if (result.length == 1) {
        
        let token = jwt.sign({correo: result.correo, tipo: result.id_role}, clave);

        
        if (await bcrypt.compare(contrasena, result[0].contrasena)) {
          res.status(200).json({msj: 'usuario loggeado', token: token});
        }else{
          res.status(404).json({msj: 'contraseña incorrecta'});
        }
       
      } 
      
      }
    catch (e){
      console.log(e);
    }
  };

  exports.getUsuarios = getUsuarios;
  exports.newUsuario = newUsuario;
  exports.deleteUsuario = deleteUsuario;
  exports.loginUsuario = loginUsuario;
  exports.updateUsuario = updateUsuario;
  //exports.favoritos = favoritos;