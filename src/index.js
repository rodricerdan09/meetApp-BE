////////////////////// IMPORT APP //////////////////////////////////
import app from './app.js';
import '@babel/polyfill';
////////////////////// RUN SERVER //////////////////////////////////
let { Port=5000, IP='127.0.0.1' }=process.env;
function main(Port,IP) {
    app
    .listen(
        Port, 
        IP, 
        err =>{ 
            if (err) 
                console.log(err)
            else 
                console.log('\x1b[34m',`Server running at http://${IP}:${Port}/`);
        }    
    );

}

main(Port,IP);