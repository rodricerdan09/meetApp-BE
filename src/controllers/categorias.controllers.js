// import model
import Categorias from '../models/categorias.models.js';
import Locales from '../models/locales.models.js';



export async function listCategorias (req, res) {
    
    try {
        let categorias = await Categorias.findAll({ include: Locales });
        res.json(categorias);
    } catch (error) {
        res.status(412).json({msg: error.message});
    }       
}

export async function createCategorias (req, res) {
    
    try {
        let {nombre} = req.body;
        let categoria = await Categorias.create({nombre});
        res.json(categoria);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export async function updateCategorias (req, res) {
    let {nombre, id} = req.body;
    let categoriasBody={nombre};
    let categoriaID=parseInt(id);

    try {
        let result = await Categorias.findByPk(categoriaID);
        let categoria = await result.update(categoriasBody);
        res.json(categoria);
    } catch (error) {
       res.status(412).json({msg: error.message}); 
    }
}

export async function readCategorias (req, res) {
    let {id} = req.params;

    try {
        let categoria= await Categorias.findByPk(id, { attributes: ['id','nombre'] });
        res.json(categoria);
    } catch (error) {
        res.status(412).json({msg: error.message});
    }
}

export async function deleteCategorias (req, res) {
    let {id} = req.params;
    let success1={
        "msg": `Categoria de id:${id} eliminado`, 
        "status": "success 1"
    };

    try {
        let result= await Categorias.destroy({where: {id}});
        res.status(200).json(success1); 
    } catch (error) {
        res.status(412).json({msg: error.message});
    }
} 

