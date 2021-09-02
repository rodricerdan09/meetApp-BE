// create model 
//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../db/db.js');

var Categorias = sequelize.define('categorias',{ 
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
                msg:"Debe completar la denominación o nombre de la categoria"
            }
        }      
    }
});

module.exports=Categorias;

