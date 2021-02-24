Base de Datos:

La base de datos usada es MySQL.
Descargar los drivers para que pueda correr el motor dentro del puerto 3306.

La base de datos se importa del archivo dump-delilah.

NodeJS:

El puerto de salida es el 3500.

Las dependencias que hay que instalar para que el servidor corra como corresponde son Express, jsonwebtoken (para autorizar tanto a usuarios como a admins), sequelize y bcrypt que genera una clave mas segura para el usuario.

Todas se instalan con el comando npm i *nombre de la dependencia*

Tambien se puede instalar el nodemon para estar constantemente activo con el puerto. Este se corre con el comando npx nodemon.

Todos los comandos se deben de correr dentro de la carpeta del proyecto.

Documentacion:
El archivo documentacion-javascript-client es donde se encuentra la documentacion. Importar dentro de swagger para poder revisar. 

El archivo documentacion.yaml es un borrador de la documentacion.



