// create model 
//import sequelize
var Sequelize = require('sequelize');
// importing connection database
var sequelize = require('../db/db.js');
var Mesas = require('./mesas.models.js');
var Reservas = require('./reservas.models.js');

var MesasReservas = sequelize.define('mesas_reservas',{ 
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    }
});

Mesas.hasMany(MesasReservas);
MesasReservas.belongsTo(Mesas);

Reservas.hasMany(MesasReservas);
MesasReservas.belongsTo(Reservas);

module.exports=MesasReservas;

