////////////////////// IMPORTS //////////////////////////////////
import express, { urlencoded, json } from 'express';
import router from './routes/router';
import morgan from 'morgan';
import cors from 'cors';

////////////////////// SETUP ///////////////////////////////////
let app = express();
app.use(urlencoded({extended:true}));
app.use(json());
app.use(morgan('dev'));
app.use(cors());
app
    .use((req, res, next) => {
        res
        .header(
            'Access-Control-Allow-Origin', 
            '*'
        );
        res
        .header(
            'Access-Control-Allow-Headers', 
            "Authorization,\
            X-API-KEY,\
            Origin,\
            X-Requested-With,\
            Content-Type,\
            Content-Type:application/json,\
            Accept,\
            Access-Control-Allow-Request-Method"
        );
        res
        .header(
            'Access-Control-Allow-Methods', 
            'GET, POST, PATCH, PUT, DELETE'
        );
        res
        .header(
            'Allow', 
            'GET, POST, PATCH, PUT, DELETE'
        );
         next();
    }
);
            
app.use(router);
            
export default app;
//https://github.com/auth0-blog/auth0-express-js-sample/blob/main/src/messages/messages.service.js
//DOTENV https://manage.auth0.com/dashboard/us/dev-conrado/rules/new 