//import sequelize
var Sequelize = require('sequelize');
const route = require('../routes/categorias.routes.js');
// import model
var Estados = require('../models/estados.models.js');

const estadosController={};

estadosController.index=(req, res) => {
    return res.send('<h2>Bienvenido a MeetApp<h2>');
}

estadosController.list = (req, res) => {
    Estados.findAll()
    .then(estados => res.json(estados))
    .catch(error =>  res.status(412).json({msg: error.message}));
}

estadosController.create = (req, res) => {
    let estadosBody={
        nombre: req.body.nombre
    };
    Estados.create(estadosBody)
        .then(estados=>res.json(estados))
        .catch(error=>res.status(400).json({msg: error.message}));
}

estadosController.update = (req, res) => {
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

estadosController.read = (req, res) => {
    let estadoID=parseInt(req.params.id);
    Estados.findByPk(estadoID, 
        { attributes: ['id','nombre'] })
    .then(estados => res.json(estados))
    .catch(error =>res.status(412).json({msg: error.message}));
}

estadosController.delete = (req, res) => {
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

module.exports=estadosController;