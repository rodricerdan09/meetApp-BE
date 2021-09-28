//import sequelize
import { QueryTypes, Op, literal }  from 'sequelize';
import sequelize from '../db/sequelize';
// import model
import Locales from '../models/locales.models.js';
import Categorias from '../models/categorias.models.js';
import Mesas from './../models/mesas.models';
import Reservas from '../models/reservas.models';
import MesasReservas from '../models/mesas.reservas.models';



export function listLocales (req, res)  {
    Locales.findAll({ include: Categorias })
    .then(locales => res.json(locales))
    .catch(error =>  res.status(412).json({msg: error.message}));
}

export function createLocales (req, res)  {
    let localesBody={
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        capacidad: req.body.capacidad,
    };
    Locales.create(localesBody)
        .then(locales=>res.json(locales))
        .catch(error=>res.status(400).json({msg: error.message}));
}

export function readLocales (req, res)  {
    let localID=parseInt(req.params.id);
    Locales.findByPk(localID, 
        { attributes: ['id','nombre', 'direccion'] })
    .then(locales => res.json(locales))
    .catch(error =>res.status(412).json({msg: error.message}));
}

export function updateLocales (req, res)  {
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

export function deleteLocales (req, res)  {
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


export async  function disponibilidadLocales (req, res)  {
    let {fecha}=req.params;
    console.log(fecha)
    //let fecha="2021-10-21";
    try {
        let capacidad= await Locales
            .findAll(
                {
                    attributes:["id","nombre","direccion"],
                    include:[
                        
                        {
                            model:Categorias,
                            required: true,
                            attributes:["nombre"]
                        },
                        {
                            model:Mesas,
                            required: true,
                            attributes:[
                                [literal('SUM (mesas.capacidad)'), 'capacidad']
                            ],
                            where: {
                                disponible: {[Op.not]: null}
                            }
                        }
                        
                    ],
                    group: ['categoria.nombre' , 'locales.nombre'],
                    raw: true, //true sin formato
                    //order: literal('declaracionesjuradas.year , declaracionesjuradas.month, empresas.rubro,empresas.cuit ,Ventas.denominacion DESC') 
                    
                }
            )

        let ocupado= await Locales.findAll(
            {
                attributes:["id"],
                include:[
                    
                    {
                        model:Categorias,
                        required: true,
                        attributes:["nombre"]
                    },
                    {
                        model:Mesas,
                        required: true,
                        attributes:[
                            [literal('SUM (mesas.capacidad)'), 'ocupado']
                        ],
                        where: {
                            disponible: {[Op.not]: null}
                    },
                        include:[
                            {
                                model: MesasReservas,
                                attributes:["id"],
                                required: true, 
                                include:[
                                    {
                                        model: Reservas,
                                        attributes:["fecha"],
                                        where: {fecha},
                                        required: true,
                                    }
                                ]
                            }
                            
                        ]   
                    }
                    
                ],
                group: ['categoria.nombre' , 'locales.nombre'],
                raw:true, //true sin formato
                //order: literal('declaracionesjuradas.year , declaracionesjuradas.month, empresas.rubro,empresas.cuit ,Ventas.denominacion DESC') 
                
            }
        )
        let capacidadTotal = capacidad
            .map( local =>
                {   let {id, nombre,direccion}=local;
                    let categoria = local['categoria.nombre'];
                    let capacidadDelLocal=local['mesas.capacidad'];
                    
                    let lugaresOcupados=0;
                    let buscarLugarOcupado=ocupado.find(lugar => lugar.id === local.id);
                    if (buscarLugarOcupado) {
                        
                        lugaresOcupados=buscarLugarOcupado['mesas.ocupado'];
                    } 
                    
                    let porcentajeOcupado=parseInt((lugaresOcupados*100)/capacidadDelLocal);
                    return {
                        id,
                        nombre,
                        direccion, 
                        categoria,
                        capacidadDelLocal,
                        lugaresOcupados,
                        porcentajeOcupado
                    }
                }
            );
        res.json(capacidadTotal)
    } catch (error) {
        res.status(412).json({msg: error.message})
    }
}
 

