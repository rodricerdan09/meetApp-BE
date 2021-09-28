// create model 
//import sequelize
import Sequelize from 'sequelize';
// importing connection database
import sequelize from '../db/sequelize.js';
import Mesas from './mesas.models.js';
import Reservas from './reservas.models.js';

let MesasReservas = sequelize.define('mesas_reservas',{ 
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    }
});

Mesas.hasMany(MesasReservas);
MesasReservas.belongsTo(
    Mesas, 
    {
        onDelete: 'SET NULL',
        onUpdate:'CASCADE'
    }
);

Reservas.hasMany(MesasReservas);
MesasReservas.belongsTo(
    Reservas, 
    {
        onDelete: 'CASCADE', 
        onUpdate:'CASCADE'
    }
);

export default MesasReservas;

