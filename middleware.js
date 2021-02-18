const jwt = require('jsonwebtoken');





const autentificarAdmin = (req,res,next) =>{
    const query = `select nombre_rol,usuario from usuarios inner join usuarios on usuarios_roles.id_role = usuarios.id_usuario and usuario.email = '?'`;
    if(query !== 1){
    console.log('no')
    res.status(401).send("No esta autorizado")
    }
    next();
}
const autentificarUser = (req, res, next) => {
    //codigo que identifica si el que ingresa tiene permitido el ingreso
    const jwtToken = req.headers["authorization"];
    if (!jwtToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const jwtClient = jwtToken.split(" ")[1];
    jwt.verify(jwtClient, config.JwtSecretKey, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Token Expired" });
        }
        next();
    });
    
    
  };

  exports.autentificarUser = autentificarUser;
  