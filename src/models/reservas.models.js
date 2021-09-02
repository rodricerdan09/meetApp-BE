// create model 
//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../db/db.js');
var Estados = require('./estados.models.js');
var Mesas = require('./mesas.models.js');

var Reservas = sequelize.define('reservas',{ 
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },  
    fecha:{
        type: Sequelize.DATE,
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
    }

    //ID ESTADO RESERVA 
});

Mesas.hasMany(Reservas);
Reservas.belongsTo(Mesas);

Estados.hasMany(Reservas);
Reservas.belongsTo(Estados);

module.exports=Reservas;

