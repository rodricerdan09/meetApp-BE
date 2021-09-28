// import model
import Estados from '../models/estados.models.js';

export function listEstados (req, res) {
    Estados.findAll()
    .then(estados => res.json(estados))
    .catch(error =>  res.status(412).json({msg: error.message}));
}

export function createEstados (req, res) {
    let estadosBody={
        nombre: req.body.nombre
    };
    Estados.create(estadosBody)
        .then(estados=>res.json(estados))
        .catch(error=>res.status(400).json({msg: error.message}));
}

export function updateEstados (req, res) {
    let estadosBody={
        nombre: req.body.nombre
    };
    let estadoID=parseInt(req.params.id);
    Estados.findByPk(estadoID)
    .then(estados=>{
        Estados.update(estadosBody)
            .then(estados => res.json(estados));
        }
    ).catch(error =>res.status(412).json({msg: error.message}));
}

export function readEstados (req, res)  {
    let estadoID=parseInt(req.params.id);
    Estados.findByPk(estadoID, 
        { attributes: ['id','nombre'] })
    .then(estados => res.json(estados))
    .catch(error =>res.status(412).json({msg: error.message}));
}

export function deleteEstados (req, res) {
    let estadoID=parseInt(req.params.id);
    let success1={
            msg: `Estado de id:${estadoID} eliminado` , 
            status: "success 1"
        };
    success1= JSON.stringify(success1);
    Estado.destroy({where: {id: estadoID}})
    //.then(result => res.sendStatus(204))
    .then(result => res.status(200).json(success1))
    .catch(error => res.status(412).json({msg: error.message}));
} 
