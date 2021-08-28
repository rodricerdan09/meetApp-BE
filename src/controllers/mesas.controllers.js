//import sequelize
var Sequelize = require('sequelize');
const route = require('../routes/mesas.routes.js');
// import model
var Mesas= require('../models/mesas.models.js');
var Locales= require('../models/locales.models.js');

const mesasController={};

mesasController.index=(req, res) => {
    return res.send('<h2>Bienvenido a MeetApp<h2>');
}

mesasController.list = (req, res) => {
    Mesas.findAll({ attributes: ['id','numero', 'disponible', 'capacidad', 'localId'] })
    .then(mesas => res.json(mesas))
    .catch(error =>  res.status(412).json({msg: error.message}));
}

mesasController.create = (req, res) => {
    let mesasBody={
        numero: req.body.nombre,
        disponible: req.body.tipo, 
        capacidad: req.body.capacidad,
        localId: req.body.localId
    };
    Locales.create(localesBody)
        .then(mesas=>res.json(mesas))
        .catch(error=>res.status(400).json({msg: error.message}));
}

mesasController.read = (req, res) => {
    let mesaID=parseInt(req.params.id);
    Locales.findByPk(mesaID, 
        { attributes: ['id','numero', 'disponible', 'capacidad', 'localId'] })
    .then(mesas => res.json(mesas))
    .catch(error =>res.status(412).json({msg: error.message}));
}

mesasController.update = (req, res) => {
    let mesasBody={
        numero: req.body.nombre,
        disponible: req.body.tipo, 
        capacidad: req.body.capacidad,
        localId: req.body.localId
    };
    let mesaID=parseInt(req.params.id);
    Mesas.findByPk(mesaID)
    .then(mesas=>{
            Mesas.update( mesasBody)
            .then(mesa => res.json(mesa));
        }
        ).catch(error =>res.status(412).json({msg: error.message}));
}

mesasController.delete = (req, res) => {
    let mesaID=parseInt(req.params.id);
    let success1={
            msg: `Mesa de id:${mesaID} eliminado` , 
            status: "success 1"
        };
    success1= JSON.stringify(success1);
    Mesas.destroy({where: {id: mesaID}})
    //.then(result => res.sendStatus(204))
    .then(result => res.status(200).json(success1))
    .catch(error => res.status(412).json({msg: error.message}));
} 

module.exports=mesasController;

