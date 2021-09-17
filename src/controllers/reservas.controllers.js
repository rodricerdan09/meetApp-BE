//import sequelize
var Sequelize = require('sequelize');
const route = require('../routes/reservas.routes.js');
// import model
var Reservas= require('../models/reservas.models.js');
const Mesas = require('../models/mesas.models.js');
const Estados = require('../models/estados.models.js');
const { DOUBLE } = require('sequelize');

const reservasController={};

reservasController.index=(req, res) => {
    return res.send('<h2>Bienvenido a MeetApp<h2>');
}

reservasController.list = (req, res) => {
    Reservas.findAll({ include: Estados } )
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

reservasController.prueba = (req, res) => {
    console.log(req.body);
    let reserva = req.body

    const reservasBody = (reserva) => {
        let result = db.transaction(transaction => 
            db.query()
            .then( (exito) => Reservas.create(
                reserva,
                {
                    include: MesasReservas,
                    validate: true, //cuidado
                    transaction
                })
                
            )
            .then(reserva => res.json(reserva))
            .catch(error => res.status(400).json({msg: error.message}))
        )};

    declaracionesJuradasController.create= (req, res) => {
       
        let result = sequelize.transaction( transaction => 
        tablax.query().then(
            exito=>Reservas.create(
            declaracion,
            {
                include: Mesas_Reservas,
                validate: true, //cuidado
                transaction
            })
            
        )
        ) .then(reserva=>res.json(reserva))
        .catch(error=>res.status(400).json({msg: error.message}))
    }
}

module.exports=reservasController;

