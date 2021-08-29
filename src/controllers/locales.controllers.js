//import sequelize
var Sequelize = require('sequelize');
const route = require('../routes/locales.routes.js');
// import model
var Locales= require('../models/locales.models.js');
var Categorias= require('../models/categorias.models.js');

const localesController={};

localesController.index=(req, res) => {
    return res.send('<h2>Bienvenido a MeetApp<h2>');
}

localesController.list = (req, res) => {
    let query=req.query;
    Locales.findAll({ 
        attributes: ['id','nombre','direccion', 'capacidad','aforo'],
        where: query,
        include: [
            {
                model: Categorias, as: 'categorias',
                attributes: [['nombre', 'categoria']]
            },
        ]
    })
    .then(locales => res.json(locales))
    .catch(error =>  res.status(412).json({msg: error.message}));
}

localesController.create = (req, res) => {
    let localesBody={
        nombre: req.body.nombre,
        tipo: req.body.tipo, 
        direccion: req.body.direccion,
        capacidad: req.body.capacidad,
        aforo: req.body.aforo
    };
    Locales.create(localesBody)
        .then(locales=>res.json(locales))
        .catch(error=>res.status(400).json({msg: error.message}));
}

localesController.read = (req, res) => {
    let localID=parseInt(req.params.id);
    Locales.findByPk(localID, 
        { attributes: ['id','nombre', 'tipo','direccion', 'capacidad','aforo'] })
    .then(locales => res.json(locales))
    .catch(error =>res.status(412).json({msg: error.message}));
}

localesController.update = (req, res) => {
    let localesBody={
        nombre: req.body.nombre,
        tipo: req.body.tipo, 
        direccion: req.body.direccion,
        capacidad: req.body.capacidad,
        aforo: req.body.aforo
    };
    let localID=parseInt(req.params.id);
    Locales.findByPk(localID)
    .then(locales=>{
            Locales.update( LocalesBody)
            .then(local => res.json(local));
        }
        ).catch(error =>res.status(412).json({msg: error.message}));
}

localesController.delete = (req, res) => {
    let localID=parseInt(req.params.id);
    let success1={
            msg: `Local de id:${localID} eliminado` , 
            status: "success 1"
        };
    success1= JSON.stringify(success1);
    Locales.destroy({where: {id: localID}})
    //.then(result => res.sendStatus(204))
    .then(result => res.status(200).json(success1))
    .catch(error => res.status(412).json({msg: error.message}));
} 

module.exports=localesController;

