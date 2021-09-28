//import sequelize
import { QueryTypes, Op }  from 'sequelize';
import sequelize from '../db/sequelize.js';

// import model
import Reservas from '../models/reservas.models.js';
import Mesas from '../models/mesas.models.js';
import Estados from '../models/estados.models.js';
import MesasReservas from '../models/mesas.reservas.models.js';

export async  function listReservas (req, res) { 
   
    try {
        let reservas = await Reservas.findAll({ include: Estados } );
        res.json(reservas);
    } catch (error) {
        res.status(412).json({msg: error.message});
    }
}

export async function createReservas (req, res) {
    let {
        fecha,
        cantidad_reservada,
        mesaId,
        estadoId,
        comensaleId      
    }=req.body;
    let laReserva={
        fecha,
        cantidad_reservada,
        mesaId,
        estadoId,
        comensaleId      
    };

    try {
        let reservas = await Reservas.create(laReserva);
        res.json(reservas);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export async function readReservas (req, res) {
    let {id:reservaID} = req.params;
    let attributes = ['id','fecha', 'comensaleId', 'cantidad_reservada','estadoId'];
    try {
        let reservas= await Reservas.findByPk(reservaID, { attributes });
        res.json(reservas);
    } catch (error) {
        res.status(412).json({msg: error.message});
    }
}

export async function updateReservas (req, res) {
    let {id:reservaID}=req.params;
    let {
        fecha,
        cantidad_reservada
    }= req.body;
    let laReserva={
        fecha,
        cantidad_reservada
    };
  
    try {
        let reservas= await Reservas.findByPk(reservaID);
        console.log(reservas)
        reservas= await reservas.update(laReserva);
        console.log(reservas)
        res.json(reservas);
    } catch (error) {
        res.status(412).json({msg: error.message})
    }
}

export function deleteReservas (req, res) {
    let reservaID=parseInt(req.params.id);
    let success1={
            msg: `Reserva de id:${reservaID} eliminado` , 
            status: "success 1"
        };
    success1= JSON.stringify(success1);
    Reservas.destroy({where: {id: reservaID}})
    //.then(result => res.sendStatus(204))
    .then(result => res.status(200).json(success1))
    .catch(error => res.status(412).json({msg: error.message}));
} 

export async  function pruebaReservas (req, res) {
    //console.log(req.body);
    let datosdelareserva= req.body;
    let {mesas_reservas, fecha}=req.body;
    let idMesas = mesas_reservas.map( item =>{ return {id: item.mesaId }}); 
    console.log(fecha);
    //const Date = new Date(fecha);
  


    try {
        const result = await sequelize
        .transaction(async (transaction) => {
            const find = await MesasReservas
            .findAll({
           
                include:[
                    {
                        model: Reservas,
                        where: { fecha},
                        required: true,
                    },
                    {
                        model:Mesas,
                        required: true,
                        where: {
                            disponible: {[Op.not]: null},
                            [Op.or]: idMesas,
                        },
                    }
                ]
                }, 
                { transaction }
            )
            if (find.length!=0){
                throw new Error("Alguna de las mesas ya está reservada");
            }
            
            
            const reservas = await Reservas
            .create(
                datosdelareserva,
                {
                    include: MesasReservas,
                    validate: true, //cuidado
                    transaction
                }, 
                { transaction }
            );
            
            return reservas;
      
        });
        res.json(result);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }


}

// {
//     "fecha":"2021-10-05 00:00:00.000 +00:00",
//     "cantidad_reservada":5,
//     "estadoId":1,
//      "comensaleID":"1"
//     "mesas_reservas":[
//         {"mesaId":1},
//         {"mesaId":2}
//      ]
//  }

 //let id;
    //let fecha='';
   //consulta si estan disponible
  /*  sequelize.query(
    ` SELECT mesas.id
    FROM mesas
         INNER JOIN
         locales ON locales.id = mesas.localeId
   WHERE locales.id = :id AND 
         mesas.disponible IS NOT NULL AND 
         mesas.id IN (
             SELECT mesas.id
               FROM mesas_reservas
                    INNER JOIN
                    mesas ON mesas_reservas.mesaId = mesas.id
                    INNER JOIN
                    reservas ON mesas_reservas.reservaId = reservas.id
                WHERE reservas.estadoId = 1 AND 
                    reservas.fecha = :fecha
         )`, 
    { 
        replacements: { id: 1, fecha:'2021-09-05 00:00:00.000 +00:00'},
        type: QueryTypes.SELECT 
    }).then(mesasReservadas=>{
        console.log(JSON.stringify(mesasReservadas))
        let resultado=mesasReservadas.map(mesa=>mesa.id===id)
    }).catch(error=>res.status(400).json({msg: error.message}))
     */


// sequelize
//     .transaction(
//         transaction =>{

//             Reservas
//             .create(
//                 datosdelareserva,
//                 {
//                     include: MesasReservas,
//                     validate: true, //cuidado
//                     transaction
//                 }
//             )
//         }
        
//     )
//     .then(reserva=>res.json(reserva))
//     .catch(error=>res.status(400).json({msg: error.message}))
 
