//import sequelize
var Sequelize = require('sequelize');
const route = require('../routes/locales.routes.js');
const db = require('../db/db');
// import model
var Locales= require('../models/locales.models.js');
var Categorias= require('../models/categorias.models.js');


const { QueryTypes } = require('sequelize');

const localesController={};

localesController.index=(req, res) => {
    return res.send('<h2>Bienvenido a MeetApp<h2>');
}

localesController.list = (req, res) => {
    Locales.findAll({ include: Categorias })
    .then(locales => res.json(locales))
    .catch(error =>  res.status(412).json({msg: error.message}));
}

localesController.create = (req, res) => {
    let localesBody={
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        capacidad: req.body.capacidad,
    };
    Locales.create(localesBody)
        .then(locales=>res.json(locales))
        .catch(error=>res.status(400).json({msg: error.message}));
}

localesController.read = (req, res) => {
    let localID=parseInt(req.params.id);
    Locales.findByPk(localID, 
        { attributes: ['id','nombre', 'direccion'] })
    .then(locales => res.json(locales))
    .catch(error =>res.status(412).json({msg: error.message}));
}

localesController.update = (req, res) => {
    let localesBody={
        nombre: req.body.nombre,
        direccion: req.body.direccion,
    };
    let localID=parseInt(req.params.id);
    Locales.findByPk(localID)
    .then(locales=>{
            Locales.update(LocalesBody)
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


localesController.disponibilidad = (req, res) => {
    let id = 1;
    db.query(`
    SELECT SUM (OCUPADO*100 / AFORO) AS LA_MINA_DE_FABIO

FROM (SELECT (SELECT
        SUM( mesas.capacidad ) AS capacidadlocales 
        FROM
            mesas
            INNER JOIN locales ON locales.id = mesas.localeId 
        WHERE
            locales.id = 1 
            AND mesas.disponible IS NOT NULL ) AS AFORO, 
    (SELECT
		SUM( mesas.capacidad ) AS capacidadmesas 
	FROM
		mesas
		INNER JOIN locales ON locales.id = mesas.localeId 
	WHERE
		locales.id = 1 
		AND mesas.disponible IS NOT NULL 
		AND mesas.id IN (
		SELECT
			mesas.id 
		FROM
			mesas_reservas
			INNER JOIN mesas ON mesas_reservas.mesaId = mesas.id
			INNER JOIN reservas ON mesas_reservas.reservaId = reservas.id 
		WHERE
			reservas.estadoId = 1 
			AND reservas.fecha = '2021-09-05 00:00:00.000 +00:00' 
		) ) AS OCUPADO
		)`, 
    { 
        replacements: { id: 1 },
        type: QueryTypes.SELECT 
    })
    .then(local => res.json(local))
    .catch(error =>res.status(412).json({msg: error.message}));
}
 

module.exports=localesController; 
