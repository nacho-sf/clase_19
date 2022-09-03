# clase_19
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


EJEMPLO DE RELACIÓN DE COLECCIONES (ALBERTO, min 1:27:00)