// import model
import Comensales from '../models/comensales.models.js';

export function createUsers (req, res) {
    let user= req.user
    let correo= user['https://example.com/email']
    let nombre= user['https://example.com/name']
    let fotoUrl= user['https://example.com/picture']
    let comensalBody= {correo, nombre, fotoUrl}
    Comensales.create(comensalBody)
    .then((comensal)=>res.json({message: 'Hello from a private endpoint! You need to be authenticated to see this.'}))
    .catch((error)=>res.status(400).json({msg: error.message}))
}


