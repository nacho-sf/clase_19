# clase_18_y_19
CRUD con Mongoose. ORM vs ODM, Sequelize



[MongoDB] ---> Gestor de bases de datos NoSQL

[Compass] ---> Visor de bases de datos en MongoDB




    TEORÍA NO_SQL:

-Con NoSQL se trabaja con objetos (.JSON), entonces no hay que aprender un nuevo lenguaje como en SQL.

-Tenemos que modelar datos antes de comenzar la base de datos, pero una vez hecho esto es más sencillo que SQL porque se trabaja con JSON's (insert, update, delete... OBJECT)

-No hay que determinar los tipos de datos que se van a introducir (varchar 255, etc...), por eso es más dinámico, rápido y menos restrictivo.

    -->En SQL estás obligado a crear un registro donde se añaden todos los campos (los que no se introduce dato se añaden null como valor), por eso puede llegar a ocupar mucho espacio. NoSQL metes hoy 3, mañana 9, etc... Por eso se usa para apps en tiempo real como chats.


-Modelado de datos en MongoDB:
    -> Modelo sin relaciones
    -> Modelo embebido
    -> Modelo normalizado (más similar a SQL) --> mongoose facilita relacionar colecciones (tablas).



-Cómo se hacen las operaciones básicas (CRUD) en MongoDB:
    -> w3school: Node.js MongoDB
    -> https://platzi.com/contributions/operaciones-crud-en-mongodb/
        -> Crear: Método .insert, método .insertOne, método .insertMany...
        -> Leer: Método .find, ...
        -> Actualizar: Método .update, ...
        -> Eliminar: Método .deleteOne, ...

    ¡TODO SE HACE CON .JSON's!



-Se realiza una prueba para ver si funciona:

-Abro Compass y pincho en Connect.

-En la zona inferior de la pantalla pinchamos en ">_MONGOSH". Esto es una terminal para trabajar desde Compass (si no lo hiciera desde JS).

-Se le indica en qué base de datos vamos a trabajar, así que introdumos "show dbs" para ver las que tenemos.

-Usaremos la "local", así que escribimos "use local"

-Ahora queremos insertar datos en una colección (meter datos en un registro). Entonces buscamos en https://platzi.com/contributions/operaciones-crud-en-mongodb/ el comando insertMany (nombramos a la colección "users"): --> db.users.insertMany()


-Entramos en https://www.w3schools.com/nodejs/nodejs_mongodb_create_db.asp y pincho en la barra izquierda "MongoDB Insert". Buscamos el ejemplo de insertMany, copiamos el array de "var myobj" (solo el array) y lo pegamos dentro de los paréntesis de la declaración anterior:

db.users.insertMany([
    { name: 'John', address: 'Highway 71'},
    { name: 'Peter', address: 'Lowstreet 4'},
    { name: 'Amy', address: 'Apple st 652'},
    { name: 'Hannah', address: 'Mountain 21'},
    { name: 'Michael', address: 'Valley 345'},
    { name: 'Sandy', address: 'Ocean blvd 2'},
    { name: 'Betty', address: 'Green Grass 1'},
    { name: 'Richard', address: 'Sky st 331'},
    { name: 'Susan', address: 'One way 98'},
    { name: 'Vicky', address: 'Yellow Garden 2'},
    { name: 'Ben', address: 'Park Lane 38'},
    { name: 'William', address: 'Central st 954'},
    { name: 'Chuck', address: 'Main Road 989'},
    { name: 'Viola', address: 'Sideway 1633'}
  ])


-Se pulsa enter y si devuelve por terminal "acknowledged: true..." es que se ha insertado correctamente.

-Se comprueba en Compass si aparece la colección "users" entre las colecciones de mi base de datos (habrá que refrescar para que aparezca)







    COMIENZO DE LA PARTE 2 (vídeo W7 D5 Mongodb (parte II)


-Desde el visor Compass se pueden editar, borrar, crear... los campos directamente o visualizar las colecciones de diferentes modos (lista/JSON/tabla)

-También se pueden buscar colecciones en la barra de navegación (donde pone "FILTER"). Ej: Escribes {name:"Susan"} y filtra en el visor de colecciones.


-Hacemos otras operaciones CRUD de ejemplo:

    -> Escribimos en la terminar de Compass: db.users.find({name:"Peter"}). Esta operación devería de devolvernos todos los "Peter" que encuentre.

    -> Escribimos en la terminar de Compass: db.users.update({name:"Susan"},{$set:{address:"Puerta del SOL"}}). El primer parámetro es el objeto que busca y el segundo el objeto al que se le aplica el cambio

    -> Escribimos en la terminar de Compass: db.users.deleteOne({name:"Michael"})

    -> Buscar aplicando REGEXP:
        -> Buscar los address que acaben en 1: db.users.find({address:/1$/})






    EJERCICIO RESTAURANTS.JSON

Clonar el repositorio https://github.com/alejandroereyesb/mongodb_thebridge para poder obtener el archivo restaurants.json de la carpeta utils

-Importar la colección restaurants.json:

    -Opción fácil. local->CREATE COLLECTION (nombre=restaurants). Entramos a la colección (vacía). En Import Data es donde hay que subir el fichero restaurants.json, que se buscará en la carpeta que se haya descargado.

    -Hacer ejercicio 1 del repositorio git "clase 18 Introducción a MongoDB" (vídeo min 29:20, termina en 1:00:00)








    AGREGACIÓN  (analítica de datos: matchear->agrupar->ordenar...)

-Se puede trabajar de esta manera (agregate) o de la manera rudimentaria (insert, update...)

Links:
https://www.mongodb.com/docs/manual/aggregation/
https://studio3t.com/knowledge-base/articles/mongodb-aggregation-framework/


-Vamos a ver un ejemplo: En el ejemplo "Ejercicio 2" del repo git, se agrega todo el código a la terminal de Compass

-Se hacen los ejercicios del Ejercicio 2 (vídeo min 1:08:00)




-Cuando trabajamos con esto, no trabajamos directamente con las queries que hemos visto, sino que tenemos un framework que nos permite trabajar con MongoDB y simplifica las cosas -> mongoose (object data modeling):

    -Escribiendo en JS, nos crearíamos un esquema de datos (como si fuera una tabla)

    -Utiliza métodos que son una simplificación de lo que hemos estado viendo









    EJEMPLO DE VALIDACIÓN EN EL ESQUEMA DE MONGODB (vídeo 1:25:00):

const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/mydb'); // Prueba para ver si existe conexión (ya no se necesita)

const objectSchema = {
    id: { 
        type: Number, 
        required: true,
        unique: true
    },
    title: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image:{
        type: String,
        validate: {
            validator: function(url){
                return url.indexOf('.jpg') != -1;
            }, 
            message: "Porfa, sólo imágenes JPG"
        }
    }
};
// Crear el esquema
const productSchema = mongoose.Schema(objectSchema);
// Crear el modelo --> Colección
const Product = mongoose.model('Product', productSchema);

module.exports = Product;












    MONGODB ATLAS: Servicio de Mongo gratuito para desplegar las bases de datos en la nube

Repasar...







    EJEMPLO DE RELACIÓN DE COLECCIONES (ALBERTO, min 1:27:00)

Repasar...










    MONGOOSE (para SQL estaría SEQUELIZE)

-En el ejercicio anterior de los restaurantes introducíamos comandos en la terminal de Compass (  Ej: "db.<collection>.findOne()"  ). Estos métodos nos sirven para trabajar con NoSQL "a pelo". Esto se puede hacer con mongoose, más sencillo.

-Mongoose es un driver (librería) que nos sirve de ODM (object document modeling) para OngoDB en NodeJS con el que podemos crear "Schemas" para tipado de datos, esquematizar, validar, crear métodos y middlewares.  ¡¡ MODELIZACIÓN !!
    --> Y simplifica el código !!!

    -> ORM sería igual, pero para SQL (object relation modeling)


-Arquitectura de una API:

    POST/GET -> ( [Express][Node.js file][mongoose ODM] ) -> [MongoDB]

    -Le llega una petición a una ruta, esta la manda al controlador, y este consulta a la base de datos. Pero en lugar de "hablar" directamente con MongoDB *(1), mongoose hace de intermediario entre mi servidor y la base de datos. A mongoos, el controlador le va a decir: "Te paso un objeto, y luego, me devuelves otro objeto"



*(1)
-Código para hablar "a pelo" con la base de datos:

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});



-Tanto MONGOOSE como SEQUELIZE sirven para alejarnos del mundo de la elaboración de queries.

    ->Por ejemplo, la complicación que tiene para nosotros SQL es que hay que aprender el lenguaje para hacer las queries. SEQUELIZE permite hacer directamente métodos de JS un insert, inner join, create... ¡¡ PERO PRIMERO ES RECOMENDABLE TOCAR SQL NORMAL PARA SABER CÓMO FUNCIONA !!


-EJEMPLO DE MONGOOSE:

-Lo primero es crear un fichero que represente tu Scheme, que irá en la carpeta models. A partir del esquema (estructura del objeto) con el tipado de datos (string, date...), se crea el modelo...



-Prueba de conectividad desde NodeJS a MongoDB:

-Se instala MongoDB en NodeJS: npm i mongodb

-En la carpeta models se crea un fichero "pruebaMongo.js" y se copia el siguiente código:


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = [
    { name: 'John', address: 'Highway 71'},
    { name: 'Peter', address: 'Lowstreet 4'},
    { name: 'Amy', address: 'Apple st 652'},
    { name: 'Hannah', address: 'Mountain 21'},
    { name: 'Michael', address: 'Valley 345'},
    { name: 'Sandy', address: 'Ocean blvd 2'},
    { name: 'Betty', address: 'Green Grass 1'},
    { name: 'Richard', address: 'Sky st 331'},
    { name: 'Susan', address: 'One way 98'},
    { name: 'Vicky', address: 'Yellow Garden 2'},
    { name: 'Ben', address: 'Park Lane 38'},
    { name: 'William', address: 'Central st 954'},
    { name: 'Chuck', address: 'Main Road 989'},
    { name: 'Viola', address: 'Sideway 1633'}
  ];
  dbo.collection("customers").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});



-Este código:
-Se conectará a la DB "mydb", y si no extiste la crea.
-Inserta muchos documentos en una colección que se llama "customers".

-Se ejecuta: node models/pruebaMongo.js

-Comprobar en Compass que se has insertado las colecciones.




-Una vez comprobada la conectividad, se crea "products.js" en la carpeta models y se pega el siguiente código:


const mongoose = require('mongoose');

// Prueba para ver si existe conexión (ya no se necesita)
//mongoose.connect('mongodb://localhost:27017/mydb'); 

const objectSchema = {
    id: { 
        type: Number, 
        required: true,
        unique: true
    },
    title: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image:{
        type: String,
        validate: {
            validator: function(url){
                return url.indexOf('.jpg') != -1;
            }, 
            message: "Porfa, sólo imágenes JPG"
        }
    }
};




-Este código es un ejemplo de "Scheme" que se crea con mongoose (el objeto es como un esquema de tabla de SQL, con su tipado y validaciones...)


-Entonces, se crea el esquema pegando esto. Este código toma todo el objeto anterior:
// Crear el esquema
const productSchema = mongoose.Schema(objectSchema);


-A partir del esquema, se crea el modelo (que se llamará Product) con este código:
// Crear el modelo --> Colección
const Product = mongoose.model('Product', productSchema);

-Se exporta el modelo Product, con este código:
//Exportar modelo
module.exports = Product;



-Hay que instalar mongoose: npm i mongoose

-Se realiza una prueba rápida para comprobar la conectividad con mongoose:

    -> Pegar bajo módulos importados: mongoose.connect('mongodb://localhost:27017/mydb');

    -> Al final del documento pegar este código (insertar un producto):


const p = new Product({
    id: 86,
    title: "Tortilla",
    price: 1.80,
    description: "Tortilla jugosa del teatro",
    image:"https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-768x530.jpg"
});

p.save().then((data) => console.log(data))



-Ejecutamos para comprobar que inserta: node models/products.js
    
    ->(cambiar el id de la colección Product cada vez que se haga nueva prueba). Habría que obtener una librería para autoincrementar de forma automática el id.

    ->Modificar la extensión de la imagen para probar la validación, probar los tipados...


-Entonces ya tendríamos creado el modelo




    MODIFICACIÓN CÓDIGO PARA LLAMAR A LOS PRODUCTS DE NUESTRA API


-Ahora, mirando el ejemplo "products" de los días anteriores, vemos que dependíamos de una API externa. Vamos a hacer que el controlador deje de hacer fetch a una API externa, y lo que se haga sea una petición interna a mi base de datos. (ver esquema excalidraw de Alex, de la arquitectura web // en lugar de fakestoreAPI, MI BBDD)


-La operación hay que hacerla en el controlador, porque es donde se realizan las peticiones externas (fetch --> peticiones a API's externas)



-Primero, hay que conectarse a la base de datos:

    -Vamos a externalizar los datos de conexión a Mongo. -> se crea dbMongo.js en la carpeta utils, y se pega el siguiente código:


    const mongoose = require("mongoose");

    //const DATABASE_URL = "mongodb://localhost:27017/fakeshop";
    mongoose.connect("mongodb://localhost:27017/fakeshop", { useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;

    // Eventos
    db.on("error", error => console.log(error));
    db.once("open", () => console.log("connection to MongoDB established"));

    module.exports = mongoose;


    -> Este fichero sirve para abrir la conexión a mongoose

    -> Esta conexión va a crear (si no existe), una base de datos llamada "fakeshop"

    -> Los "// Eventos" son como listeners

    -> Todo va en un objeto llamado mongoose, y lo que se exporta es precisamente este objeto.

    -> Esto se exporta a "app.js" arrancar la base de datos desde el principio del script, y que esté listo para todas las rutas siguientes de mi aplicación

    ->Entonces me voy a "app.js" y hago un "require"(importación): require('./utils/dbMongo.js');

    -> Se enciende el servidor Express. Si no da error, se puede empezar a trabajar.






-Como decíamos, la operación se hará en el controlador:

-En estos momentos no hay nada creado en nuestra fakestoreapi, por lo que habría que guardar algo. Entonces comenzaremos con el controlador "createProduct", y así se guardará algo en base de datos al ejecutar.



-Antes teníamos el siguiente controlador:

const createProduct = async (req, res) => {
    console.log("Esto es el consol.log de lo que introducimos por postman",req.body); // Objeto recibido de producto nuevo
    const newProduct = req.body; // {} nuevo producto a guardar
try{
    let response = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    let answer = await response.json(); // objeto de vuelta de la petición
    console.log("Este es el console.log de lo que devuelve la api",answer);
    res.status(201).json({"message":` Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`});

}catch(error){
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({"message":` Error guardando producto ${answer.title}`});
}
}

-------------------

---> Aquí intentábamos hacer una petición externa a la API de fakestoreapi, para crear el producto:
try{
    let response = await fetch('https://fakestoreapi.com/products', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })


-Pues lo borramos:
try{
    let 

-Y escribimos:
try{
    let product = new Product(req.body); // Crear el objeto producto con los nuevos datos del producto



-Y en la siguiente línea:
let answer = await response.json(); // objeto de vuelta de la petición

-Se sustituye por:
let answer = await product.save(); // Guardar objeto en MongoDB


-Después habría que importar el modelo "products": const Product = require("../models/products");

-En products.js, en la carpeta models, tenemos una declaración que usamos anteriormente para hacer una prueba de conexión(que no se va a hacer más). Esto tenemos que borrarlo o comentarlo porque para este ejercicio ya estamos abriendo conexión desde "dbMongo.js" (en utils) y crearía un conflicto si se hace en dos sitios simultáneamente.

-Ahora vamos a hacer un POST desde Postman a la ruta que lleva a ese controlador: http://localhost:3000/api/products 

-Vemos el modelo (estructura) del objeto a crear en "products.js" (carpeta models), lo copiamos al body de Postman y lo adaptamos como queramos:

{
    "id": 937,
    "title": "Tortilla",
    "price": 1.80,
    "description": "Tortilla jugosa del teatro",
    "image":"https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-768x530.jpg"
}


-Si ejecutamos el POST en Postman, nos dará el mensaje de API_KEY no proveída. Esp es porque tenemos establecido un middleware para esa ruta. Entonces miramos la API_KEY e introducimos el parámetro en la URL:

    -> http://localhost:3000/api/products?API_KEY=12354djd


-Ahora nos habrá creado y guardado el producto. Comprobamos que se ha creado mirando el objeto en Compass.

-Cuando creamos el objeto podemos crear 2 ID's. Uno lo crea automático (_id) y es el que usa para relacionar con otras colecciones (no se toca). El otro lo introducimos nosotros si queremos y para el fin que queramos.




-Ahora vamos a hacer el getProducts:

-Tenemos el siguiente código:


const getProducts = async (req, res) => {
    if (req.params.id) {
        try {
            let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); //{}
            let product = await response.json(); //{}
            res.status(200).json(product);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).json({"message":"producto no encontrado"});
        }
    } else {
        try {
            let response = await fetch(`https://fakestoreapi.com/products`); // []
            let products = await response.json(); // []
            res.status(200).json( {products});
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).json( {products});
        }
    }
}


-Esta línea:
try {
    let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); //{}


-La borramos:
try {
    let response = 


-Y queremos hacer un "find" con mongoose:
try {
    let product = await Product.find({id:req.params.id},'title price id -_id');



-Con el 2º "try" hacemos lo mismo, pero con el método de mongoose de findAll. Entonces el código completo modificado de getProducts queda así:


const getProducts = async (req, res) => {
    if (req.params.id) {  // FIND BY ID
        try {
            // Se filtra por lo que se quiere, y por lo que se quiere quitar
            let product =  await Product.find({id:req.params.id},'title price id -_id'); 
            res.status(200).json(product);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).json({"message":"producto no encontrado"});
        }
    } else { // FIND ALL
        try {
            // Se filtra por lo que se quiere, y por lo que se quiere quitar
            let products = await Product.find({}).sort({'id':'desc'}); 
            res.status(200).json( {products});
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).json( {products});
        }
    }
}


-Ya se podría probar. La ruta para buscar productos sería:
    -> [GET] http://localhost:3000/api/products
    -> [GET] http://localhost:3000/api/products/1 (búsqueda por id)


-Para filtrar campos devueltos, se coloca un segundo parámetro al método .find de mongoose. Ej 2º "try" del getProducts:

    -> let products = await Product.find({}).sort({'id':'desc'});

    Por:

    -> let products = await Product.find({}, 'title price id -_id').sort({'id':'desc'});

        -> Esto indica que devuelva solo "title", "price" y "id", y que excluya "_id"



-Para ordenar los campos devueltos, mongoose tiene el método ".sort". Ordenaríamos la búsqueda de todos los productos. En el ejemplo están ordenados por id descendente.

-El UPDATE y el DELETE nos lo mandan constuir nosotros mismos


-La complicación general de esto es saber buscar y aplicar los métodos de mongoose (find, create...)









    RELACIONAR DATOS CON MONGOOSE  -  POPULATE  --> (min 55:00 Mongo CRUD2)

-Modelo de datos normalizado en NoSQL (similar al relacional SQL)

-Las colecciones de MOngoDB se van a poder relacionar fácilmente con el método de mongoose ".populate"

    -> Un ejemplo podría ser una colección de videojuegos y otra de publishers (sega, sony, nintendo). A través de una query se podrían sacar, tanto los datos de la colección videojuegos, como otros de la colección publisher (ej->nombre)

    ->El método .populate, en una query, trae los datos de la tabla relacionada.



-Se crearía un proyecto nuevo de prueba solo para ver el funcionamiento del siguiente código. Contenido proyecto demo DEMO_MONGO:

[/node_modules] [Game.js] [Publisher.js] [main.js] [package-lock.json] [package-json]


            MODELOS:

[Publisher.js] (modelo para colección publisher)

const mongoose = require('mongoose');

const objectSchema = {
    companyName: String,
    firstParty: Boolean,
    website: String
}

//Crear esquema
const publisherSchema = mongoose.Schema(objectSchema);
//Crear modelo
const Publisher = mongoose.model('Publisher', publisherSchema);

module.exports = Publisher;



[Game.js] (modelo para colección games)

const mongoose = require('mongoose');

const objectSchema = {
    title: String,
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publisher'
    }
}

//Crear esquema
const gameSchema = mongoose.Schema(objectSchema);
//Crear modelo
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;



        INIT TEST

[main.js] (fichero de prueba)

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-games')
    .then(() => console.log('Now connected to MongoDB'))
    .catch(err => console.error('Something went wrong', err))

const Game = require('./Game')
const Publisher = require('./Publisher')

async function createPublisher(companyName, firstParty, website) {
    const publisher = new Publisher({
        companyName,
        firstParty,                         
        website                                //Crea un objeto publisher
    });

    const result = await publisher.save();     //Lo guarda
    console.log(result);                       //Para verlo por consola
}

async function createGame(title, publisher) {
    const game = new Game({
        title,
        publisher                             //Crea un objeto publisher
    });

    const result = await game.save();         //Lo guarda
    console.log(result);                      //Para verlo por consola
}

async function listGames() {
    const games = await Game
        .find()                                      //Trae la colección Game
        .populate('publisher', 'companyName -_id')   //Como un INNER JOIN en SQL
        .select('title publisher -_id');        //Dame solo title, publ. y quita _id
    console.log(games);
}

//createPublisher('Nintendo', true, 'https://www.nintendo.com/');
//createPublisher('Sony', true, 'https://www.sony.com/');
//createPublisher('Sega', true, 'https://www.sega.com/');

//createGame('Sonic the Hedgehog', '62ea5c8deb0cc4db1eb95366');
//createGame('Donkey Kong', '62ea5c8deb0cc4db1eb95364');
//createGame('Crash Bandicoot', '62ea5c8deb0cc4db1eb95365');

//listGames();



-Se descomentan los 3 createPublisher y ejecuto el archivo: node main.js. Se comprueba en Compass. Se busca en Compass->publishers el _id de los objetos creados y se copia/pega en el segundo parámetro de las funciones createGame del videojuego perteneciente a dicha compañía (sustituir el actual)

-Se vuelven a comentar los 3 createPublisher y se descomentan los 3 createGame. Se ejecuta "node main.js". Esto habrá creado la colección Game.

-Ahora vamos a ejecutar la query que relaciona cada juego con su publisher. Se vuelve a comentar los 3 createGame. Se descomenta "listGames()" y ejecutamos: node main.js.

-Tendremos una query con un listado de juegos y con los nombres (en lugar de _id) de sus compañías correspondientes.



-Pasos en código para insertar un nuevo juego:

    -> Cómo hacer un insert de algo que tiene relación con otra colección

    ->Necesitaría pasarle al esquema del modelo el título y el id de la compañía

1º-Buscar el ID que tiene SONY en MongoDB:
    -> Ej pseudocódigo: const publi = Publisher.find({company:Sony})

2º-Crear el juego, añadiendo el ID:
    -> Ej pseudocódigo: new Publisher({title:'Tomb Raider', publisher_id:publi._id})


-Ejemplo bueno: https://kipalog.com/posts/Mongoose-One-to-Many-Relationship-Example


-La clase continuaba haciendo los ejercicios del repo git sobre lo visto en clase (colección provider...)