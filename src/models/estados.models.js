// create model 
//import sequelize
import Sequelize from 'sequelize';
// importing connection database
import sequelize from '../db/sequelize.js';

let Estados = sequelize.define('estados',{ 
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

export default Estados;

