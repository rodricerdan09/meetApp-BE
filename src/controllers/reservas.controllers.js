//import sequelize
var Sequelize = require('sequelize');
const route = require('../routes/reservas.routes.js');
// import model
var Reservas= require('../models/reservas.models.js');
const Mesas = require('../models/mesas.models.js');
const Estados = require('../models/estados.models.js');

const reservasController={};

reservasController.index=(req, res) => {
    return res.send('<h2>Bienvenido a MeetApp<h2>');
}

reservasController.list = (req, res) => {
    Reservas.findAll({ include:
        [
            { model: Mesas },
            { model: Estados }
        ] 
    })
    .then(reservas => res.json(reservas))
    .catch(error =>  res.status(412).json({msg: error.message}));
}

reservasController.create = (req, res) => {
    let reservasBody={
        fecha: req.body.fecha,
        cantidad_reservada: req.body.cantidad_reservada,
        mesaId: req.body.mesaId,
        estadoId: req.body.estadoId
        //comensaleId: req.body.comensaleId         
    };
    Reservas.create(reservasBody)
        .then(reservas=>res.json(reservas))
        .catch(error=>res.status(400).json({msg: error.message}));
}

reservasController.read = (req, res) => {
    let reservaID=parseInt(req.params.id);
    Reservas.findByPk(reservaID, 
        { attributes: ['id','fecha', 'comensaleId'] })
    .then(reservas => res.json(reservas))
    .catch(error =>res.status(412).json({msg: error.message}));
}

reservasController.update = (req, res) => {
    let reservaBody={
        fecha: req.body.fecha,
        comensaleId: req.body.comensaleId
    };
    let reservaID=parseInt(req.params.id);
    Reservas.findByPk(reservaID)
    .then(reservas=>{
        Reservas.update(reservaBody)
            .then(reserva => res.json(reserva));
        }
        ).catch(error =>res.status(412).json({msg: error.message}));
}

reservasController.delete = (req, res) => {
    let reservaID=parseInt(req.params.id);
    let success1={
            msg: `Reserva de id:${reservaID} eliminado` , 
            status: "success 1"
        };
    success1= JSON.stringify(success1);
    Reservas.destroy({where: {id: reservaID}})
    //.then(result => res.sendStatus(204))
    .then(result => res.status(200).json(success1))
    .catch(error => res.status(412).json({msg: error.message}));
} 

module.exports=reservasController;

