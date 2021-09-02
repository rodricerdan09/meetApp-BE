//import sequelize
var Sequelize = require('sequelize');
const route = require('../routes/users.routes.js');
// import model
var Comensales = require('../models/comensales.models.js');

const usersController={};

usersController.index=(req, res) => {
    return res.send('<h2>Bienvenido a MeetApp<h2>');
}


usersController.create = (req, res) => {
    let user= req.user
    let correo= user['https://example.com/email']
    let nombre= user['https://example.com/name']
    let fotoUrl= user['https://example.com/picture']
    let comensalBody= {correo, nombre, fotoUrl}
    console.log("hjdhjhdjdhj")
    Comensales.create(comensalBody)
    .then((comensal)=>res.json({message: 'Hello from a private endpoint! You need to be authenticated to see this.'}))
    .catch((error)=>res.status(400).json({msg: error.message}))
}



module.exports=usersController;