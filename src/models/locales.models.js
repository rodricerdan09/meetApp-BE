// create model 
//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../db/db.js');
var Categorias = require('./categorias.models.js');

var Locales = sequelize.define('locales',{ 
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
                msg:"Debe completar la denominación o nombre de la empresa"
            }
        }
    },
    direccion:{
        type: Sequelize.STRING(50),
    
        allowNull: {
            args:[false],
            msg:'No se permite direccion nulo'
        },
        validate:{
            notEmpty:{
                args:[true],
                msg:"Debe completar la direccion de la empresa"
            }
        }     
    },
    capacidad: {
        type: Sequelize.BIGINT(3), 
        validate:{
            min: {
                args: [1],
                msg: "El número de aforo no puede ser menor a lo admitido "
              },                  
            max: {
                args: [999],
                msg: "El número de aforo no puede ser mayor a lo admitido"
              },
            isInt:{
                args:[true],
                msg:"Solo se permite digitos númericos sin puntos ni guiones"
            }    
        }
    },
    aforo: {
        type: Sequelize.BIGINT(3), //20383170959
        validate:{
            min: {
                args: [1],
                msg: "El número de aforo no puede ser menor a lo admitido"
              },                  
            max: {
                args: [999],
                msg: "El número de aforo no puede ser mayor a lo admitido"
              },
            isInt:{
                args:[true],
                msg:"Solo se permite digitos númericos sin puntos ni guiones"
            }    
        }
    },
    
   //id gerente
});

Categorias.hasMany(Locales);
Locales.belongsTo(Categorias);

/* el método define() recibe como primer parámetro el nombre de la base de datos, 
como segundo parámetro un objeto donde ponemos los atributos de nuestra tabla, donde 
podemos especificar que tipo de dato va representar este campo.*/

module.exports=Locales;

