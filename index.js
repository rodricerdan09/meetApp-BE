//DOTENV https://manage.auth0.com/dashboard/us/dev-conrado/rules/new


//Server generated
const express = require('express');
const morgan = require('morgan');

//JWT
const checkJwt =require('./src/auth/auth.js');


//cors
let cors = require('cors');
let app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
        "Authorization,\
         X-API-KEY,\
         Origin,\
         X-Requested-With,\
         Content-Type,\
         Content-Type:application/json,\
         Accept,\
         Access-Control-Allow-Request-Method");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.header('Allow', 'GET, POST, PATCH, PUT, DELETE');
    next();
});


/* const Comensales = require('./src/models/comensales.models');

// This route needs authentication
app.get('/api/private', checkJwt, async(req, res) =>{     
    let user= req.user
    let correo= user['https://example.com/email']
    let nombre= user['https://example.com/name']
    let fotoUrl= user['https://example.com/picture']
    let comensalBody= {correo, nombre, fotoUrl}

    Comensales.create(comensalBody)
    .then((comensal)=>res.json({message: 'Hello from a private endpoint! You need to be authenticated to see this.'}))
    .catch((error)=>res.status(400).json({msg: error.message}))

    // console.log(email+" "+name+" "+picture)
    // res.json({message: 'Hello from a private endpoint! You need to be authenticated to see this.'})
    }
);  */
app.get('/api/public', (req, res) => 
    res.json({message: 'Hello from a public endpoint!'})
);
//imports routes 
//locales
const usersRoute = require('./src/routes/users.routes.js');
app.use('/api', usersRoute);
//locales
const localesRoute = require('./src/routes/locales.routes.js');
app.use('/api', localesRoute);
//categorias
const categoriasRoute = require('./src/routes/categorias.routes.js');
app.use('/api', categoriasRoute);
//mesas
const mesasRoute = require('./src/routes/mesas.routes.js');
app.use('/api', mesasRoute);
//comensales
const comensalesRoute = require('./src/routes/comensales.routes.js');
app.use('/api', comensalesRoute);
//reservas
const reservasRoute = require('./src/routes/reservas.routes.js');
app.use('/api', reservasRoute);
//estados reservas
const estadosRoute = require('./src/routes/estados.routes.js');
app.use('/api', estadosRoute);

//Run Server
let Port = process.env.PORT || 5000;
let IP = process.env.IP || '127.0.0.1';
app.listen(Port, IP, (err) => {
    if (err) {
       console.log(err)
   } else {
       console.log(`Server running at http://${IP}:${Port}/`);
    }
});

//https://github.com/auth0-blog/auth0-express-js-sample/blob/main/src/messages/messages.service.js
