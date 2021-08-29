//http://localhost:3000/declaracionesjuradas/?year=aa&month=mm
declaracionesJuradasController.list= (req, res) => {
    let consulta=req.query;
    DeclaracionesJuradas.findAll({
        attributes: ['cuit', 'year', 'month'],
        where: consulta,
        include: [
            {
                model: Ventas, as: 'ventas',
                attributes: ['ean','denominacion','unidad_medida','cantidad_producida','cantidad_vendida','precio_venta' ]
            },
        ]
        })
        .then(declaracionesJuradas => res.json(declaracionesJuradas))
        .catch(error => res.status(412).json({msg: error.message}));
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