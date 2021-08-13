# meetApp-BE
Aplicación desarrollada para la catedra Habilitación Profesional del 4°Año de la UTN-FRRe

**\
 Node.js, Express y sequelizejs**

Para empezar tenemos que verificar que tenemos instalado Node.js en
nuestro entorno de desarrollo mediante el comando:

node -v

npm -v

Listo si tenemos instalado lo necesario vamos a proceder a crear la
carpeta para el proyecto le vamos a nombrar crud-express.

Dentro de este directorio vamos a ejecutar el comando:

npm init

El comando crea un archivo **package.json** que nos ayuda a administrar
las dependencias que vamos a necesitar para nuestro proyecto.

Vamos a abrir nuestro editor de código preferido en mi caso uso Visual
Studio Code, para crear un archivo llamado server.js, puedes llamarlo
como gustes.

**Agregar la dependencia Express para crear el servidor**

Agregaremos la dependencia mediante el siguiente comando:

npm install express \--save

** \--save** guarda express como una dependencia en **package.json**.
Luego con el comando **npm install** se podrán recuperar todas las
dependencias.

En nuestro archivo **index.js** vamos a agregar el siguiente código para
iniciar nuestro servidor Express lo que vamos a hacer es importar los
módulos necesarios para ejecutarlo.

const express = require(\'express\');

const app = express();

const port = 3000;

app.listen(3000, function () {

console.log(\'listening on \'+port)

});

Adicional tenemos que indicarle el puerto, lo suelo poner como constante
pero tú puedes ponerlo directamente en el método listen.

Agregaremos un método GET para comprobar el funcionamiento de nuestro
servidor.

app.get(\'/\', (req, res) =\> {

res.send(\"Hello world!\")

})

Ahora, ejecutamos en nuestra consola **node index.js** y en un navegador
escribiremos la ruta **http://localhost:3000** podremos ver nuestro
mensaje de **Hello world! **entonces nuestro servidor esta funcionando
correctamente.

**Agregamos nodemon a nuestro proyecto**

Para facilitarnos el desarrollo instalaremos **nodemon** esta
dependencia reinicia automáticamente el servidor cada que existe un
cambio en los archivos del proyecto.

En este caso solo necesitamos **nodemon **en el proceso de desarrollo
por ello lo guardaremos con la bandera --save-dev para que lo guarde
como dependencia de desarrollo.

npm install nodemon \--save-dev

Una vez instalado agregaremos una clave de script en nuestro
archivo **package.json** para ejecutar nodemon con un comando npm.

En la sección de scripts agregamos lo siguiente:

\"scripts\": {

\"dev\": \"nodemon index.js\",

}

Ahora en nuestra consola ejecutamos el comando para llamar este script:

npm run dev

**Agregamos Sequelize para guardar los datos**

En este caso vamos a usar SQLITE por medio de un ORM que se llama
Sequelize Instalamos la dependencia ejecutando el siguiente comando

npm install ssqlite3 sequelize

En nuestro archivo server.js crearemos la constante de conexión de
Sequelize

Debemos instalar una nueva dependencia **body-parser** para ello
ejecutamos el siguiente comando (en algunas versiones ya está deprecado)

npm install body-parser \--save

**Creación del CRUD**

Vamos crear nuestros **métodos, GET, POST, PUT, DELETE** en nuestro
archivo **index.js según corresponda **agregaremos los siguientes
cambios

Mediante una aplicación o su propio código **front-end** podemos
consumir este servicio REST para nuestro ejemplo usaremos POSTMAN.
