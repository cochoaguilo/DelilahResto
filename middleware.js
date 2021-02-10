const autentificarAdmin = (req, res, next) => {
    //codigo que identifica si el que ingresa tiene permitido el ingreso
    const nombre = req.query.nombre
    const query = 'SELECT admin FROM usuarios WHERE nombre=?';
    
    
  };

  /*const emailValid = (req, res, next) => {
  var correo = req.body.email;
  arroba = correo.indexOf("@");
  punto = correo.lastIndexOf(".");
  extension = correo.split(".")[1];

  if (arroba < 1 || punto - arroba < 2 || correo === "") {
    res.send("correo invalido");
  } else if (extension.length > 3) {
    res.send("correo invalido");
  } else {
    res.send("correo valido");
  }

  next();
};*/