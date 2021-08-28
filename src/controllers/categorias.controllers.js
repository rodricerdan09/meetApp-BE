//import sequelize
var Sequelize = require('sequelize');
const route = require('../routes/categorias.routes.js');
// import model
var Categorias = require('../models/categorias.models.js');

const categoriasController={};

categoriasController.index=(req, res) => {
    return res.send('<h2>Bienvenido a MeetApp<h2>');
}

categoriasController.list = (req, res) => {
    Categorias.findAll({ attributes: ['id','nombre'] })
    .then(categorias => res.json(categorias))
    .catch(error =>  res.status(412).json({msg: error.message}));
}

categoriasController.create = (req, res) => {
    let categoriasBody={
        nombre: req.body.nombre
    };
    Categorias.create(categoriasBody)
        .then(categorias=>res.json(categorias))
        .catch(error=>res.status(400).json({msg: error.message}));
}

categoriasController.update = (req, res) => {
    let categoriasBody={
        nombre: req.body.nombre
    };
    let categoriaID=parseInt(req.params.id);
    Categorias.findByPk(categoriaID)
    .then(categorias=>{
        Categorias.update(categoriasBody)
            .then(categorias => res.json(categorias));
        }
        ).catch(error =>res.status(412).json({msg: error.message}));
}

categoriasController.read = (req, res) => {
    let categoriaID=parseInt(req.params.id);
    Categorias.findByPk(categoriaID, 
        { attributes: ['id','nombre'] })
    .then(categorias => res.json(categorias))
    .catch(error =>res.status(412).json({msg: error.message}));
}

categoriasController.delete = (req, res) => {
    let categoriaID=parseInt(req.params.id);
    let success1={
            msg: `Categoria de id:${categoriaID} eliminado` , 
            status: "success 1"
        };
    success1= JSON.stringify(success1);
    Locales.destroy({where: {id: categoriaID}})
    //.then(result => res.sendStatus(204))
    .then(result => res.status(200).json(success1))
    .catch(error => res.status(412).json({msg: error.message}));
} 

module.exports=categoriasController;