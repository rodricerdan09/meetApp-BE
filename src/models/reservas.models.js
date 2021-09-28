// create model 
//import sequelize
import Sequelize from 'sequelize';
// importing connection database
import sequelize from '../db/sequelize.js';
import Estados from './estados.models.js';
import Mesas from './mesas.models.js';
import Comensales from './comensales.models.js';
let Reservas = sequelize
    .define('reservas',
        { 
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true 
            },  
            fecha:{
                type: Sequelize.STRING,
                allowNull: {
                    args:[false],
                    msg:'No se permite fecha reserva nulo'
                }                    
            },
            cantidad_reservada:{
                type: Sequelize.INTEGER(3),
                allowNull: {
                    args:[false],
                    msg:'No se permite cantidad nulo'
                },
                validate:{
                    notEmpty:{
                        args:[true],
                        msg:"Debe indicar el numero de acompañantes"
                    }
                }     
            },
            comensaleId: {
                type: Sequelize.INTEGER,
                allowNull: false
            }

            //ID ESTADO RESERVA 
        }
    );

//Mesas.hasMany(Reservas);
///Reservas.belongsTo(Mesas);

Estados.hasMany(Reservas);
Reservas.belongsTo(Estados);
Reservas.belongsTo(Comensales);

export default Reservas;

