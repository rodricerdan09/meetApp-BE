//database connection
var Sequelize = require('sequelize');

const db= new Sequelize({
  dialect: 'sqlite',
  define: {
    timestamps: false
  },
  storage: './src/db/database.sqlite'
  });

/*  const db = new Sequelize('meetapp', 'root', 'toor', {
  host: '127.0.0.1',
  dialect: 'mysql',
});  */

db.sync({force: false}) //false para produccion
    .then(()=>console.log('database is connected'))
    .catch((error)=>console.log("error: ", error));  

//end database connection.
module.exports= db;

/*  New Sequelize crea una nueva instancia de esta clase que recibe como 
parámetros en su constructor, el nombre de la base de datos, el nombre del 
usuario, la contraseña, y un objeto de configuración donde especificamos el 
host de nuestra base de datos, el dialect que es donde ponemos que base de
datos se esta utilizando. */
