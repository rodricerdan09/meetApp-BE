//database connection
import Sequelize from 'sequelize';

const sequelize= new Sequelize(
  {
    dialect: 'sqlite',
    define: {
      timestamps: false
    },
    storage: './src/db/database.sqlite'
  }
);

/*  const sequelize = new Sequelize('meetapp', 'root', 'toor', {
  host: '127.0.0.1',
  dialect: 'mysql',
});  */
const force=true;
sequelize
  .sync({force:!force}) //false para produccion con ! está en false
  .then(_=>console.log('\x1b[36m%s\x1b[0m',`database is connected with force in ${!force}`))
  .catch(error=>console.log(`error: ${error}`));  

//end database connection.
export default sequelize;

/*  New Sequelize crea una nueva instancia de esta clase que recibe como 
parámetros en su constructor, el nombre de la base de datos, el nombre del 
usuario, la contraseña, y un objeto de configuración donde especificamos el 
host de nuestra base de datos, el dialect que es donde ponemos que base de
datos se esta utilizando. */
