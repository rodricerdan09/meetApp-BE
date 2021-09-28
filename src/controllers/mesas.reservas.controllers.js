// import model
import MesasReservas from '../models/mesas.reservas.models.js';
import Reservas from '../models/reservas.models.js';
import Mesas from '../models/mesas.models.js';

export function listMesasReservas (req, res) {
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

export function createMesasReservas (req, res) {
    let mesasReservasBody={
        reservaId: req.body.reservaId,
        mesaId: req.body.mesaId
    };
    MesasReservas.create(mesasReservasBody)
        .then(mesasReservas=>res.json(mesasReservas))
        .catch(error=>res.status(400).json({msg: error.message}));
}

export function updateMesasReservas (req, res) {
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

export function readMesasReservas (req, res) {
    let mesaReservaBodyID=parseInt(req.params.id);
    MesasReservas.findByPk(mesaReservaBodyID, 
        { attributes: ['id','reservaId', 'mesaId'] })
    .then(mesasReservas => res.json(mesasReservas))
    .catch(error =>res.status(412).json({msg: error.message}));
}

export function deleteMesasReservas (req, res) {
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

