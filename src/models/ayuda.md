## Utilice Sequelize para conectarse a la base de datos
Sequelize.js es un marco ORM para nodejs.

Aquellos que han usado nodejs para conectarse a la base de datos deben estar familiarizados con la base de datos. Si es un enlace directo, debe establecer y administrar la conexión usted mismo, y también debe escribir instrucciones SQL manualmente. No importa si el proyecto es simple, pero una vez que el diseño del proyecto es más complicado, la escritura de todo el SQL consume mucha energía cuando hay más tablas.

Ya existen marcos de base de datos ligeros o soluciones en lenguajes como Java y C #. En nodejs, recomiendo Sequelize. Es un marco muy maduro y también muy ventajoso en términos de velocidad y rendimiento. La parte más crítica es que el desarrollo diario solo requiere la creación de objetos de administración, la invocación de métodos de consulta, etc., y es necesario escribir muy pocas declaraciones SQL. Una ventaja de esto es que elimina la necesidad de un mantenimiento complejo de declaraciones SQL y también evita errores innecesarios causados ​​por SQL.

Sequelize es un marco ORM para node.js y io.js. Específicamente, destaca una amplia gama de métodos de consulta, configuración unificada y soporte. Es compatible con bases de datos que incluyen: PostgreSQL, MySQL, MariaDB, SQLite y MSSQL.

Prueba y dirección de visualización de API en este artículo:dirección de github

## Manifestación
La llamada de Sequelize destaca una llamada simple y rápida. La situación específica puede sentir el siguiente código. Si tiene experiencia en desarrollo, puede omitirlo.
```
Table1.findById(23);
//select a,b,c,d from table1 where id=23;
 
Table1.findAll({
	where:{a:"test",b:76}
});
//select a,b,c,d from table1 where a="test" and "b=76;
```

En la consulta de tabla única, solo se requiere una configuración simple para completar la consulta. ¿Es muy simple y conveniente?

## Conectarse a la base de datos
La conexión de Sequelize necesita pasar parámetros y se puede configurar para abrir el grupo de subprocesos, leer y escribir la biblioteca y otras operaciones.

La forma sencilla de escribir es esta:new Sequelize ("nombre de la tabla", "nombre de usuario", "contraseña", configuración)

Todos los parámetros rara vez se usan en el uso normal. Aquí hay una plantilla de uso común. Solo necesita modificar los valores que usa.
```
const sequelize = new Sequelize('database', 'username', 'password',  {
  host: 'localhost',    // Dirección de la base de datos, por defecto esta máquina
  port:'3306',
  dialect: 'mysql',
  pool: {   // Configuración del grupo de conexiones
    max: 5, // Número máximo de conexiones
    min: 0, // Número mínimo de conexiones
    idle: 10000
  },
 });
```
Los siguientes son parámetros de configuración detallados.
```
const sequelize = new Sequelize('database', 'username', 'password', {
  // Tipo de base de datos, soporte: 'mysql', 'sqlite', 'postgres', 'mssql'
  dialect: 'mysql',
  // Dirección de enlace personalizada, que puede ser ip o nombre de dominio, máquina local predeterminada: localhost
  host: 'my.server.tld',
  // Puerto personalizado, predeterminado 3306
  port: 12345,
  // Parámetros usados ​​por postgres, tipo de conexión, predeterminado: tcp
  protocol: null,
  // Ya sea para iniciar el registro, el valor predeterminado es usar console.log
  // Se recomienda habilitarlo para facilitar la comparación de la declaración sql generada
  logging: true,
  // predeterminado está vacío
  // Soporte: 'mysql', 'postgres', 'mssql'
  dialectOptions: {
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  // La ubicación de almacenamiento de sqlite, solo sqlite es útil
  // - Predeterminado ': memoria:'
  storage: 'path/to/database.sqlite',
 
  // Si convertir indefinido a NULL
  // - Predeterminado: falso
  omitNull: true,
  // Activar el soporte ssl en pg
  // - Predeterminado: falso
  native: true,
  // Parámetros predeterminados de la base de datos, parámetros globales
  define: {
    underscored: false
    freezeTableName: false,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: true
  },
  // ¿Está sincronizado?
  sync: { force: true },
  // Configuración del grupo de conexiones
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
  isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ
})
```

## Definir objetos de modelo
El objeto modelo debe crearse antes de su uso. Es el nombre de la tabla en la base de datos, los campos utilizados, el tipo de campo, etc.

Este es un método de desarrollo recomendado. Primero cree el objeto en nodejs y luego llame al método de sincronización de Sequelize para crear automáticamente la base de datos. Esto evita la necesidad de escribir código para crear tablas y crear tablas manualmente en la base de datos. Solo necesita considerar el tipo de objeto y otros atributos en el código por separado.

Si la tabla se creó en la base de datos y no se puede eliminar, no se puede crear automáticamente en este momento, porque los datos antiguos se eliminarán cuando se cree.

La siguiente es una creación de objeto simple. En la mayoría de los casos, está bien.

``` 
const users = db.define('t_user'/ * Nombre de la tabla personalizada * /, {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,       //Clave primaria
        autoIncrement: true,    //Incrementar
        comment: "Aumentar id"       // Comentario: solo válido en el código
    },
    // nombre de usuario
    username: {
        type: Sequelize.STRING,
        validate:{
	        isEmail: true,   // Detección de tipo, si es un formato de buzón
        }
    },
    //contraseña
    pwd: {
        type: Sequelize.STRING(10),
        allowNull: false,// No se permite nulo
    },
    //estado
    status: {
        type: Sequelize.INTEGER,
         defaultValue: 0,// El valor predeterminado es 0
    },
    //apodo
    nickname: {
        type: Sequelize.STRING
    },
    //token
    token: {
        type: Sequelize.UUID
    },
    create_time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
}, {
    // Usar nombre de tabla personalizado
    freezeTableName: true,
    // Elimina la hora predeterminada para agregar y actualizar
    timestamps: false,
    indexes:[
	    // Índice normal, BTREE por defecto
        {
            unique: true,
            fields: ['pid']
        },
     ]
});
// Sincronización: crea uno nuevo si no hay
// users.sync();
// Sincronizar después de eliminar
users.sync({
    force: true
});
```
Copiar codigo
tipo de datos
En el párrafo anterior, se cubrió la creación de objetos y se utilizaron varios tipos de objetos. Aquí está el uso específico del tipo.
```
Sequelize.STRING 		// Cadena, la longitud predeterminada es 255, VARCHAR (255)
Sequelize.STRING(1234)  // Establecer cadena de longitud, VARCHAR (1234)
Sequelize.STRING.BINARY   // Definir tipo VARCHAR BINARY
Sequelize.TEXT           // Cadena larga, texto TEXTO
Sequelize.TEXT('tiny')   // Cadena de texto pequeña, TINYTEXT
 
Sequelize.INTEGER      // int numero, int
Sequelize.BIGINT       // Número más grande, BIGINT
Sequelize.BIGINT(11)   // Establece la longitud del número, BIGINT (11)
 
Sequelize.FLOAT        // Tipo de punto flotante, FLOAT
Sequelize.FLOAT(11)     // Establece la longitud del punto flotante, FLOAT (11)
Sequelize.FLOAT(11, 12)  // Establecer la longitud y el número de posiciones decimales del punto flotante, FLOAT (11,12)
 
Sequelize.REAL     //REAL  PostgreSQL only.
Sequelize.REAL(11) // REAL(11)    PostgreSQL only.
Sequelize.REAL(11, 12)  // REAL(11,12) PostgreSQL only.
 
Sequelize.DOUBLE     // DOUBLE
Sequelize.DOUBLE(11)  // DOUBLE(11)
Sequelize.DOUBLE(11, 12) // DOUBLE(11,12)
 
Sequelize.DECIMAL     // DECIMAL
Sequelize.DECIMAL(10, 2)  // DECIMAL(10,2)
 
Sequelize.DATE    // Tipo de fecha, DATETIME para mysql / sqlite, TIMESTAMP WITH TIME ZONE para postgres
Sequelize.DATE(6) // mysql 5.6.4+ es compatible, la precisión de minutos y segundos es de 6 dígitos
Sequelize.DATEONLY   // fecha solo parte
Sequelize.BOOLEAN   // tipo int, la longitud es 1, TINYINT (1)
 
Sequelize.ENUM('value 1', 'value 2')  // tipo enumerado
Sequelize.ARRAY(Sequelize.TEXT)  //PostgreSQL only.
Sequelize.ARRAY(Sequelize.ENUM)  //  PostgreSQL only.
 
Sequelize.JSON   // JSON column. PostgreSQL, SQLite and MySQL only.
Sequelize.JSONB  // JSONB column. PostgreSQL only.
 
Sequelize.BLOB   // BLOB (bytea for PostgreSQL)
Sequelize.BLOB('tiny')  // TINYBLOB (bytea for PostgreSQL. Other options are medium and long)
 
Sequelize.UUID  // El tipo de datos de PostgreSQL y SQLite es UUID y MySQL es de tipo CHAR (36)
 
Sequelize.CIDR  // Tipo de CIDR en PostgreSQL
Sequelize.INET   // Tipo INET en PostgreSQL
Sequelize.MACADDR  // Tipo MACADDR en PostgreSQL
 
Sequelize.RANGE(Sequelize.INTEGER)    //PostgreSQL only.
Sequelize.RANGE(Sequelize.BIGINT)     // PostgreSQL only.
Sequelize.RANGE(Sequelize.DATE)       //PostgreSQL only.
Sequelize.RANGE(Sequelize.DATEONLY)   //PostgreSQL only.
Sequelize.RANGE(Sequelize.DECIMAL)    //PostgreSQL only.
 
Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)) // PostgreSQL only.
 
Sequelize.GEOMETRY   //PostgreSQL (with PostGIS) or MySQL only.
Sequelize.GEOMETRY('POINT')  // PostgreSQL (with PostGIS) or MySQL only.
Sequelize.GEOMETRY('POINT', 4326)// PostgreSQL (with PostGIS) or MySQL only.
```
Copiar codigo
Detección de tipo de datos
Puede ver arriba que el campo de validación se usa para verificar si el valor del campo cumple con el estándar, de modo que pueda saber si los datos cumplen con las reglas antes de ingresar a la biblioteca. De lo contrario, almacenar precipitadamente datos desconocidos en la base de datos es como llevar a un extraño a casa. Si es seguro o no depende del destino.

Sequelize tiene muchas verificaciones integradas. Si no está satisfecho con ellas, puede definir una usted mismo.
```
validate: {
    is: ["^[a-z]+$",'i'],     // Coincidir con todas las letras
    is: /^[a-z]+$/i,          // Todas las letras coinciden, escritas en expresiones regulares
    not: ["[a-z]",'i'],       // no puede contener letras
    isEmail: true,            // Comprueba el formato del correo
    isUrl: true,              // ¿Es una URL legal?
    isIP: true,               // ¿Es una dirección IP legal?
    isIPv4: true,             // ¿Es una dirección IPv4 legal?
    isIPv6: true,             // ¿Es una dirección IPv6 legal?
    isAlpha: true,            // es una carta
    isAlphanumeric: true,     // ¿Son números y letras?
    isNumeric: true,          // Solo se permiten números
    isInt: true,              // Solo se permiten enteros
    isFloat: true,            // ¿Es un número de coma flotante?
    isDecimal: true,          // ¿Es un libro decimal?
    isLowercase: true,        // ¿Está en minúsculas?
    isUppercase: true,        // Ya sea para capitalizar
    notNull: true,            // no se permite que sea nulo
    isNull: true,             // ¿Es nulo?
    notEmpty: true,           // No se permite que esté vacío
    equals: 'specific value', // igual a algún valor
    contains: 'foo',          // contiene ciertos caracteres
    notIn: [['foo', 'bar']],  // no en la lista
    isIn: [['foo', 'bar']],   // en la lista
    notContains: 'bar',       // no contiene
    len: [2,10],              // rango de longitud
    isUUID: 4,                // ¿Son uuids legales?
    isDate: true,             // ¿Es una fecha válida?
    isAfter: "2011-11-05",    // ¿Es posterior a cierta fecha?
    isBefore: "2011-11-05",   // ¿Es anterior a una fecha determinada?
    max: 23,                  // máximo
    min: 23,                  // mínimo
    isArray: true,            // ¿Es una matriz
    isCreditCard: true,       // ¿Es un número de tarjeta de crédito válido?
    // reglas personalizadas
    isEven: function(value) {
    if(parseInt(value) % 2 != 0) {
        throw new Error('¡Por favor ingrese un número par!')
    }
}
```
Copiar codigo
Resumen de API
La API de Sequelize cubre básicamente los métodos de uso más utilizados. Entre ellos, hay varias consultas de tabla única de uso común. Para los complejos, puede consultar más API.

Consultar múltiples findAll (opts) o all (opts)
Los parámetros de consulta son universales y solo algunas API tienen parámetros especiales. Los parámetros comunes se muestran aquí una vez y se omitirán a continuación.
```
let list = await model.findAll({
	where:{
		id:{$gt:10},// id mayor que 10
		name:"test"  // el nombre es igual a la prueba
	},
	order:[
		"id",   // Ordenar por id
		["id","desc"]// Orden inverso según id
	],
	limit:10,// Número de devolución
	offset:20,// Posición inicial, omitir cantidad
	attributes:["attr1","attr2"], // Campo devuelto
});
//select attr1,attr2 from model where ......
```

Consulta por id findById (id, opts)
La clave principal de los datos predeterminados aquí es id, y los datos se consultan directamente a través de id al realizar la consulta. Se recomienda agregar id como la clave principal única al crear una nueva base de datos.
```
let model = await model.findById(12);
//select a,b,c from model where id=12;
```

Consultar un registro findOne (opta)
Consulta de registros en función de condiciones. Las condiciones aquí deben cumplimentarse, de lo contrario se devolverán los primeros datos.
```
let model = await model.findOne({
	where:{id:12}
});
//select a,b,c from model where id=12;
```

Consulta de paginación findAndCount (opciones) o findAndCountAll
La consulta de paginación es probablemente otro método común. Cualquier lista necesita ser paginada.

Este método ejecutará 2 sentencias de salto al mismo tiempo.
```
let data = await model.findAndCount({
	limit:10,// 10 por página
	offset:0*10,// Página x * Número de cada página
	where:{}
});
let list = data.rows;
let count = data.count;
//select count(*) from model where ...;
//select a,b,c from model where .... limit 0,10;
```

Agregar nuevos datos crear (modelo, opciones)
Sumar es muy cómodo. Simplemente pase el objeto modelo. Es necesario asegurarse de que los atributos y los nombres de campo del objeto modelo sean coherentes. Si son inconsistentes, se producirá un error. También puede pasar parámetros de configuración para agregar condiciones, etc.
```
let model= {
	name:"test",
	token:"adwadfv2324"
}
 await model.create(model);
//insert into model (name,token) values("test","adwadfv2324");
```
Consulta, devuelve el objeto predeterminado si no existe findOrInitialize (opts)
opts.default objeto de valor predeterminado

Este método primero consulta la base de datos y devuelve el objeto predeterminado en el parámetro si no hay ningún resultado. Esto es más adecuado para escenarios como volver al objeto predeterminado.

Consulta, crea un nuevo findOrCreate (opts) o findCreateFind si no existe
Este método también se utiliza en muchos casos. Suele utilizarse para crear automáticamente datos que no existen. El valor predeterminado se devuelve directamente.

Actualizar si no hay, agregar upsert (modelo, opciones) o insertOrUpdate (modelo, opciones)
Coincidencia basada en clave principal o clave de restricción única

Se usa comúnmente para agregar o actualizar operaciones unificadas al editar.

Actualizar actualización de registro (modelo, opciones)
Es el método de actualización más utilizado. Puede pasar el objeto del modelo a actualizar y utilizar parámetros de configuración para distinguir condicionalmente el objeto a actualizar.

Eliminar registro destruir (opta)
Hay dos tipos de eliminación, una es la eliminación física. La eliminación no existe en la tabla. El otro es paranoico. Se trata de un borrado virtual. De forma predeterminada, un campo indica si los datos se borran o no. Cuando eliminas esta condición, puedes consultar los datos borrados.

Restaurar restauración de registros (opciones)
Para restaurar varias instancias, cuando paranoid está habilitado, puede usar este método para restaurar los datos eliminados.

Otra API de uso común
El valor máximo del campo especificado consulta max ("id", opts)
El valor mínimo del campo especificado consulta min ("id", opts)
Suma suma ("id", opciones)
Agregar bulkCreate masivo ([modelo], opta)
Descripción de la estructura de la tabla de búsqueda ()
Incrementar incremento ("id", {por: 1})
Decremento ("id", {por: 1})
Cuente el número de consultas recuento (opciones)
asuntos
La transacción en Sequelize es relativamente simple. Pero si hay varias transacciones, el código escrito será muy feo. Esto puede considerarse como la peor optimización de Sequelize.

Debe recordar que los parámetros de transacción deben pasarse de manera consistente. La otra es una llamada Promise normal.
```
// Sequelize objeto después de llamar a la inicialización de Sequelize
return sequelize.transaction(function (t) {
	// Regreso a la Promesa final
  return User.create({
    firstName: 'Abraham',
    lastName: 'Lincoln'
  }, {transaction: t}).then(function (user) {
    return user.setShooter({
      firstName: 'John',
      lastName: 'Boothe'
    }, {transaction: t});
  });
}).then(function (result) {
  // Llamar activamente a commit para enviar el resultado
  return t.commit();
}).catch(function (err) {
  // Operación de reversión activa
  return t.rollback();
});
```
## Verificación de mesa múltiple
Las claves externas pueden ser un punto difícil en Sequelize. Hay un poco más de cosas involucradas aquí, veámoslo lentamente.

Puntos de conocimiento clave externa
Personalización de claves externas: tres modos de restricción:

distrito: modo estricto (predeterminado), la tabla principal no puede eliminar ni actualizar un registro al que hace referencia la tabla secundaria.
Cascada: modo en cascada, después de que se opera la tabla principal, los datos asociados con la tabla secundaria también se operan juntos. También es el modo predeterminado de Sequelize.
establecer nulo: modo de supresión, siempre que se permita que el campo de clave externa sea NLL, después de que se opere la tabla principal, el campo correspondiente a la tabla secundaria está en blanco.
La premisa de usar claves externas
Para usar claves foráneas en Sequelize, debe verificar las siguientes opciones de antemano: Uno de los errores hará que la configuración falle.

El motor de almacenamiento de tablas debe ser innodb; de lo contrario, la clave externa creada no tiene ningún efecto de restricción.
El tipo de columna de la clave externa debe ser exactamente el mismo que el tipo de clave principal de la tabla principal.
El nombre de la clave externa no se puede repetir.
Cuando un campo con datos existentes se establece como una clave externa, debe asegurarse de que los datos del campo correspondan a los datos de la clave principal de la tabla principal.
Ejemplo de uso: predeterminado
De forma predeterminada, la clave principal usa el campo id de la tabla principal y la clave externa usa la clave externa creada en el campo + tabla. Generalmente, debe especificarlo manualmente.
```
// Especifica la relación de la tabla principal
 test1.hasMany(test2, {
     foreignKey: "pid",// Nombre de clave externa
 });
 // Relación especificada en la subtabla
 test2.belongsTo(test1, {
     foreignKey: "pid",// Nombre de clave externa
 });
 ```

De forma predeterminada, se agrega un registro de clave externa a la tabla secundaria, que apunta a la identificación de la tabla principal. En circunstancias normales, esto es suficiente para un uso normal. Por ejemplo, una tabla principal registra la información del producto y una subtabla registra varios mensajes de comentarios.

Utilice ejemplo personalizado
Si la identificación de la clave principal utilizada por la tabla principal no cumple con el uso normal, también puede especificar un campo fijo como la relación de restricción en la tabla principal.

consejos: Si id no se usa como la relación principal en la tabla principal, los campos personalizados deben agregarse con condiciones como índices como la relación dependiente.
```
 test1.hasMany(test2, {
     foreignKey: "pid",// Nombre de campo de clave externa
     sourceKey: "pid",// Nombre del campo de la clave principal
 });
 test2.belongsTo(test1, {
     foreignKey: "pid",// Nombre de la asociación
     targetKey:"pid"// Campo de clave externa personalizada
 });
 // Espere el establecimiento exitoso de la clave primaria y luego establezca la relación de clave externa de la tabla secundaria
 setTimeout(() => {
    test2.sync({
        force: true
    });
}, 2500);
```

## Ejemplo de uso-pseudo relación
En el uso real, todavía prefiero esta relación. Es decir, solo se especifica la relación de clave externa cuando se determina la relación en la tabla. Al sincronizar, solo se sincroniza el contenido de la tabla y la relación de clave externa no se sincroniza.

La creación real se puede agregar al crear manualmente una tabla. O puede agregar la relación de clave externa nuevamente de forma asincrónica después de que finalice la creación automática de la tabla.
```
 test1.hasMany(test2, {
     foreignKey: "pid",
     sourceKey: "pid",
     constraints: false // Establecer una relación de clave externa de forma asincrónica
 });
 test2.belongsTo(test1, {
     foreignKey: "pid",
     targetKey:"pid",
     constraints: false // Establecer una relación de clave externa de forma asincrónica
 });
```

## Ejemplo
Para la operación real, puede ver test.js en github.dirección de github

Operación de mesa única
Sequelize devuelve un objeto personalizado después de que se devuelve el resultado de la consulta. Este objeto admite el funcionamiento continuo y los valores específicos se almacenan en valores de datos. Pero puede estar seguro de que no tendrá ningún atributo de Sequelize cuando se convierta en una cadena.
```
// Consultar un dato según condiciones
let model = await test1.findOne({
	where:{
		id:5,
		name:"test"
	}
});
// Modifica el valor del campo de nombre
model.name="Actualizar";
// Guardar, actualizará automáticamente el valor en la base de datos
model.save();
```

Investigación conjunta
En uso normal, rara vez se dice que solo se puede consultar una tabla para generar problemas. Permítanme hablar sobre cómo usar las dos tablas al realizar consultas.

La consulta aquí ya ha realizado la relación de clave externa de forma predeterminada. Sin embargo, está bien no hacerlo al usarlo, es decir, el rendimiento es levemente malo al realizar consultas.
```
// Consulta los datos de la lista de la tabla principal
// Los datos de una lista corresponden a los datos de varios elementos
 let data = await models.List.findAll({
	 where:{id:5},// Condiciones, aquí solo una consulta
     include: [{
         model: models.Item,
         as:"items",// El objeto devuelto se modifica a un nombre fijo
     }]
 });
 let list1=data[0];// Los primeros datos devueltos son los datos que se van a consultar
 let list2=list1.items;// Devuelve los datos de la subtabla, los elementos tienen un nombre personalizado
```

Para resumir
La introducción anterior ha resuelto la consulta y otras operaciones en la mayoría de los casos. Y también creo que el cuello de botella se encuentra realmente, y la solución probablemente no esté en Sequelize, o principalmente no sea el problema de Sequelize. Por ejemplo, cuando la cantidad de datos es grande, la operación de la subtabla implica más puntos de conocimiento.

nodejs aún se encuentra en la etapa de desarrollo en el back-end. Espero que más usuarios puedan contactarlo y entenderlo. No solo es una mejora para usted en el proceso de desarrollo, sino también una buena arma para mejorar en la planificación de la carrera a largo plazo.