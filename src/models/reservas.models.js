// create model 
//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../db/db.js');
var Comensales = require('./comensales.models.js');

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
    
    comensaleId: {type: Sequelize.INTEGER}    
   //ID ESTADO RESERVA 
});

Comensales.hasMany(Reservas);

/* el método define() recibe como primer parámetro el nombre de la base de datos, 
como segundo parámetro un objeto donde ponemos los atributos de nuestra tabla, donde 
podemos especificar que tipo de dato va representar este campo.*/

module.exports=Reservas;

