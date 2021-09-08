//import sequelize
var Sequelize = require('sequelize');
const route = require('../routes/categorias.routes.js');
// import model
var MesasReservas = require('../models/mesas.reservas.models.js');
var Reservas = require('../models/reservas.models.js');
var Mesas = require('../models/mesas.models.js');

const mesasReservasController={};

mesasReservasController.index=(req, res) => {
    return res.send('<h2>Bienvenido a MeetApp<h2>');
}

mesasReservasController.list = (req, res) => {
    MesasReservas.findAll(
        { include:
        [
            { model: Mesas },
            { model: Reservas }
        ] 
    })
    .then(mesasReservas => res.json(mesasReservas))
    .catch(error =>  res.status(412).json({msg: error.message}));
}

mesasReservasController.create = (req, res) => {
    let mesasReservasBody={
        reservaId: req.body.reservaId,
        mesaId: req.body.mesaId
    };
    MesasReservas.create(mesasReservasBody)
        .then(mesasReservas=>res.json(mesasReservas))
        .catch(error=>res.status(400).json({msg: error.message}));
}

mesasReservasController.update = (req, res) => {
    let mesasReservasBody={
        reservaId: req.body.reservaId,
        mesaId: req.body.mesaId
    };
    let mesaReservaBodyID=parseInt(req.params.id);
    MesasReservas.findByPk(mesaReservaBodyID)
    .then(mesasReservas=>{
        MesasReservas.update(mesasReservasBody)
            .then(mesasReservas => res.json(mesasReservas));
        }
        ).catch(error =>res.status(412).json({msg: error.message}));
}

mesasReservasController.read = (req, res) => {
    let mesaReservaBodyID=parseInt(req.params.id);
    MesasReservas.findByPk(mesaReservaBodyID, 
        { attributes: ['id','reservaId', 'mesaId'] })
    .then(mesasReservas => res.json(mesasReservas))
    .catch(error =>res.status(412).json({msg: error.message}));
}

mesasReservasController.delete = (req, res) => {
    let mesaReservaBodyID=parseInt(req.params.id);
    let success1={
            msg: `MesaReserva de id:${mesaReservaBodyID} eliminado` , 
            status: "success 1"
        };
    success1= JSON.stringify(success1);
    MesasReservas.destroy({where: {id: mesaReservaBodyID}})
    //.then(result => res.sendStatus(204))
    .then(result => res.status(200).json(success1))
    .catch(error => res.status(412).json({msg: error.message}));
} 

module.exports=mesasReservasController;