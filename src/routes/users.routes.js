var express = require('express');
var usersRoute = express();
// import controller
const usersController = require('../controllers/users.controllers.js')
const checkJwt =require('../auth/auth.js');
// create routes
usersRoute.get('/private', checkJwt, usersController.create);


// export routes
module.exports = usersRoute;