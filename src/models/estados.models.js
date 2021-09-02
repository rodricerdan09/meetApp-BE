// create model 
//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../db/db.js');

var Estados = sequelize.define('estados',{ 
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },  
    nombre:{
        type: Sequelize.STRING(50),
    
        allowNull: {
            args:[false],
            msg:'No se permite nombre nulo'
        },
        validate:{
            notEmpty:{
                args:[true],
                msg:"Debe completar la denominación o nombre del estado de la reserva"
            }
        }      
    }
});

module.exports=Estados;

