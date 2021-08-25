//import sequelize
var Sequelize = require('sequelize');
const route = require('../routes/comensales.routes.js');
// import model
var Comensales= require('../models/comensales.models.js');

const comensalesController={};

comensalesController.index=(req, res) => {
    return res.send('<h2>Bienvenido a MeetApp<h2>');
}

comensalesController.list = (req, res) => {
    Comensales.findAll({ attributes: ['id', 'correo', 'nombre', 'fotoUrl','telefono'] })
    .then(comensales => res.json(comensales))
    .catch(error =>  res.status(412).json({msg: error.message}));
}

comensalesController.create = (req, res) => {
    let comensalesBody={
        correo: req.body.correo,
        nombre: req.body.nombre,
        fotoUrl: req.body.fotoUrl, 
        telefono: req.body.telefono
    };
    Comensales.create(comensalesBody)
        .then(comensales=>res.json(comensales))
        .catch(error=>res.status(400).json({msg: error.message}));
}

comensalesController.read = (req, res) => {
    let comensalID=parseInt(req.params.id);
    Comensales.findByPk(comensalID, 
        { attributes: ['id', 'correo', 'nombre', 'fotoUrl','telefono'] })
    .then(comensales => res.json(comensales))
    .catch(error =>res.status(412).json({msg: error.message}));
}

comensalesController.update = (req, res) => {
    let comensalesBody={
        correo: req.body.correo,
        nombre: req.body.nombre,
        urlFoto: req.body.urlFoto, 
        telefono: req.body.telefono
    };
    let comensalID=parseInt(req.params.id);
    Comensales.findByPk(comensalID)
    .then(comensales=>{
             Comensales.update( comensalesBody)
            .then(comensal => res.json(comensal));
        }
        ).catch(error =>res.status(412).json({msg: error.message}));
}

comensalesController.delete = (req, res) => {
    let comensalID=parseInt(req.params.id);
    let success1={
            msg: `Comensal de id:${comensalID} eliminado` , 
            status: "success 1"
        };
    success1= JSON.stringify(success1);
    Comensales.destroy({where: {id: comensalID}})
    //.then(result => res.sendStatus(204))
    .then(result => res.status(200).json(success1))
    .catch(error => res.status(412).json({msg: error.message}));
} 

module.exports=comensalesController;

