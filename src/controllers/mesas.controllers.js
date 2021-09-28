// import model
import Mesas from '../models/mesas.models.js';
import Locales from '../models/locales.models.js';
import {literal} from 'sequelize';
import MesasReservas from './../models/mesas.reservas.models';
import Reservas from './../models/reservas.models';


//http://localhost:5000/api/local/pedro/piso/1/mesas/
export async function listMesas (req, res) {
    let {nombre,piso}=req.params;
    let matrizDeMesas=[];
    try {
        let mesas= await Mesas
            .findAll(
                {   
                    where:{
                        piso
                    },
                    attributes:['id','numero',['disponible','habilitado'],'capacidad','piso','fila_mesa','columna_mesa'],
                    include:[ 
                        {
                            model:Locales, 
                            required: true,
                            attributes:['nombre'],
                            where:{
                                nombre
                            }
                        }
                    ],
                    
                    raw:true, //true sin formato
                    group: ['mesas.piso' , 'mesas.fila_mesa', 'mesas.columna_mesa' ],
                    order: literal('mesas.piso , mesas.fila_mesa, mesas.columna_mesa ASC')  
                }
            );
        let mesasReservadas= await Mesas
        .findAll(
            {   
                where:{
                    piso
                },
                attributes:['id','numero','capacidad','piso','fila_mesa','columna_mesa'],
                include:[ 
                    {
                        model:Locales, 
                        required: true,
                        attributes:['nombre'],
                        where:{
                            nombre
                        }
                    },
                    {
                        model:MesasReservas, 
                        required: true,
                        //attributes:['nombre'],
                        //where:{
                        //    nombre
                        //},
                        include:[
                            {
                                model:Reservas, 
                                required: true,
                                //attributes:['nombre'],
                                //where:{
                                //    nombre
                                //},
                            }
                        ] 
                    }
                ],
                
                raw:true, //true sin formato
                group: ['mesas.piso' , 'mesas.fila_mesa', 'mesas.columna_mesa' ],
                order: literal('mesas.piso , mesas.fila_mesa, mesas.columna_mesa ASC')  
            }
        );
        //mesas=[...mesas,...mesasReservadas]
        mesas=mesas
            .map(mesa=>
                {   
                    let{id,
                        numero,
                        capacidad,
                        habilitado,
                        piso,
                        fila_mesa,
                        columna_mesa}=mesa;
                    let disponible=null;
                    if (habilitado===1) {
                        disponible=true;
                    }
                    let busco=mesasReservadas.find(mr=>mr.id===mesa.id);
                    if (busco){
                        disponible=false;
                    }
                    return{
                        id,
                        numero,
                        disponible,
                        capacidad,
                        piso,
                        fila_mesa,
                        columna_mesa,
                        disponible
                    }
                }
            )
        let {fila_mesa,columna_mesa}=mesas[mesas.length-1]
        //console.log(mesas)
        for (let f = 1; f <= fila_mesa; f++) {
            let filaMesa=mesas
            .filter(m=>
                {
                    if(m.fila_mesa===f ){
                        return m
                    }
                }
            )
         
            matrizDeMesas.push(filaMesa);
            
        }     
        res.json(matrizDeMesas);
    } catch (error) {
        res.status(412).json({msg: error.message});
    }
}
export async function cantidadDePisos (req, res) {
    let {nombre}=req.params;
    try {
        let pisos = await 
        Mesas
            .findAll(
                {
                    attributes:[
                        [literal('MAX (mesas.piso)'), 'pisos']
                    ],
                
                    include:[ 
                        {
                            model:Locales, 
                            required: true,
                            attributes:['nombre'],
                            where:{
                                nombre
                            }
                        }
                    ]
                }
                    
            )
 
       
        res.json(pisos);
    } catch (error) {
        res.status(412).json({msg: error.message});
    }
}
export function createMesas (req, res) {
    let mesasBody={
        numero: req.body.numero,
        disponible: req.body.disponible,
        capacidad: req.body.capacidad,
        piso: req.body.piso,
        fila_mesa: req.body.fila_mesa,
        columna_mesa: req.body.columna_mesa,
        localeId: req.body.localeId
    };
    Mesas.create(mesasBody)
        .then(mesas=>res.json(mesas))
        .catch(error=>res.status(400).json({msg: error.message}));
}

export async function readMesas (req, res) {
    let {id:mesaID}=req.params;
  
    try {
        let mesas= await Mesas
            .findByPk(
                mesaID, 
            { attributes: ['id','numero', 'disponible', 'capacidad', 'localeId'] }
            );
        res.json(mesas);
    } catch (error) {
        res.status(412).json({msg: error.message})
    }
}

export function updateMesas (req, res) { 
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

export function deleteMesas (req, res) {
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



