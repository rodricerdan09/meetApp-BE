const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.or]: [
      { authorId: 12 },
      { authorId: 13 }
    ]
  }
});

Mesas.findAll({
    where: {
        disponible: {[Op.not]: null},
        [Op.or]: [
            { id: 12 },
            { id: 13 }
        ]
    },
    include: [{
    model: MesasReservas,
    required: true,
        include: [{
            model:Reservas,
            required: true,
            where: { fecha:'2021-09-05 00:00:00.000 +00:00'}
        }],
    }]
}
)

mesas locales  mesas_reservas 


SELECT m.id
  FROM mesas AS m
       INNER JOIN
       mesas_reservas AS mr ON m.id = mr.mesaId
       INNER JOIN
       reservas AS r ON r.id = mr.reservaId
 WHERE fecha = "2021-09-05 00:00:00.000 +00:00" AND 
       (m.numero = 1 OR 
        m.numero = 2);

        try {

            const result = await MesasReservas.findAll({
               
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
            }
            )
            console.log(result)
            res.json(result);
        } catch (error) {
            res.status(400).json({msg: error.message});
        }