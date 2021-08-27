// create model 
//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../db/db.js');

var Comensales = sequelize.define('comensales',{ 
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },  
    correo:{
        type: Sequelize.STRING(50),
    
        allowNull: {
            args:[false],
            msg:'No se permite correo nulo'
        },
        validate:{
            notEmpty:{
                args:[true],
                msg:"Debe indicar el correo del comensal"
            }
        }     
    },
    nombre:{
        type: Sequelize.STRING(50),
    
        allowNull: {
            args:[false],
            msg:'No se permite nombre comensal nulo'
        },
        validate:{
            notEmpty:{
                args:[true],
                msg:"Debe indicar el nombre del comensal"
            }
        }     
    },
    fotoUrl:{
        type: Sequelize.STRING(100),
    
        allowNull: {
            args:[false],
            msg:'No se permite url foto nulo'
        },
        validate:{
            notEmpty:{
                args:[true],
                msg:"Debe indicar la url de la foto del comensal"
            }
        }     
    },
    telefono:{
        type: Sequelize.STRING(15)        
    }
    
});

/* el método define() recibe como primer parámetro el nombre de la base de datos, 
como segundo parámetro un objeto donde ponemos los atributos de nuestra tabla, donde 
podemos especificar que tipo de dato va representar este campo.*/

module.exports=Comensales;

