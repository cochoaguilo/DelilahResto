const jwt = require('jsonwebtoken');





const autentificarUser = (req,res,next) =>{
    autenticacion(req,res, next, 2)
}
const autentificarAdmin = (req, res, next) => {
    autenticacion(req,res, next, 1)    
  };


function autenticacion(req,res,next, admin){
      //codigo que identifica si el que ingresa tiene permitido el ingreso
    const jwtToken = req.headers["authorization"];
    if (!jwtToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    let clave = "marcos21";
    const jwtClient = jwtToken.split(" ")[1];
    jwt.verify(jwtClient, clave, (error, decoded) => {
        if (error) {
            return res.status(401).json({ message: "Token Expired" });
        }
        console.log(decoded);
        if (decoded.tipo ==admin) {
            next();
        }else{
            return res.status(401).json({message: 'usuario no permitido'})
        }
    });
  }

  exports.autentificarUser = autentificarUser;
  exports.autentificarAdmin = autentificarAdmin;
  