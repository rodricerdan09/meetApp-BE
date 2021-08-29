//DOTENV https://manage.auth0.com/dashboard/us/dev-conrado/rules/new
var dotenv = require('dotenv');
dotenv.config();

//Server generated
const express = require('express');
const morgan = require('morgan');

//JWT
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-conrado.us.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: 'http://localhost:5000',
  issuer: [`https://dev-conrado.us.auth0.com/`],
  algorithms: ['RS256']
});

//cors
var cors = require('cors');
var app = express();
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type,Content-Type:application/json, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    res.header('Allow', 'GET, POST, PATCH, PUT, DELETE');
    next();
});

//imports model 
const Comensales = require('./src/models/comensales.models');

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
);
app.get('/api/public', (req, res) => 
    res.json({message: 'Hello from a public endpoint!'})
);
//imports routes 
//locales
const localesRoute = require('./src/routes/locales.routes.js');
app.use('/api', localesRoute);
//categorias
const categoriasRoute = require('./src/routes/categorias.routes.js');
app.use('/api', categoriasRoute);
//mesas
const mesasRoute = require('./src/routes/mesas.routes.js');
app.use('/api', mesasRoute);
//mesas
const comensalesRoute = require('./src/routes/comensales.routes.js');
app.use('/api', comensalesRoute);
//reservas
const reservasRoute = require('./src/routes/reservas.routes.js');
app.use('/api', reservasRoute);

//Run Server
var Port = process.env.PORT || 5000;
var IP = process.env.IP || '127.0.0.1';
app.listen(Port, IP, (err) => {
    if (err) {
       console.log(err)
   } else {
       console.log(`Server running at http://${IP}:${Port}/`);
    }
});

//https://github.com/auth0-blog/auth0-express-js-sample/blob/main/src/messages/messages.service.js
