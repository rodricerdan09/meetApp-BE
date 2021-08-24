// create model 
//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../db/db.js');
var Locales = require('./locales.models.js');

var Mesas = sequelize.define('mesas',{ 
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },  
    numero:{
        type: Sequelize.INTEGER(3),
    
        allowNull: {
            args:[false],
            msg:'No se permite nombre nulo'
        },
        validate:{
            notEmpty:{
                args:[true],
                msg:"Debe indicar el numero de la mesa"
            }
        }     
    },
    disponible:{
        type: Sequelize.BOOLEAN    
    },
    capacidad:{
        type: Sequelize.INTEGER(3),
    
        allowNull: {
            args:[false],
            msg:'No se permite nombre nulo'
        },
        validate:{
            notEmpty:{
                args:[true],
                msg:"Debe completar la capacidad de la mesa"
            }
        }     
    },
    localeId: {type: Sequelize.INTEGER}
});
Mesas.belongsTo(Locales)

/* el método define() recibe como primer parámetro el nombre de la base de datos, 
como segundo parámetro un objeto donde ponemos los atributos de nuestra tabla, donde 
podemos especificar que tipo de dato va representar este campo.*/

module.exports=Mesas;

