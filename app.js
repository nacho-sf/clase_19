// Módulos externos
const express = require('express')
require('./utils/dbMongo.js'); // Abrir conexión a la BBDD Mongo

// dotenv
require('dotenv').config()
console.log(process.env) // Borrar console.log después de ver que funciona

// Middleware
const manage404 = require('./middlewares/error404');

const checkApiKey = require('./middlewares/auth_API_KEY');

const app = express()
const port = 3000

// Rutas de productos
const productsRoutes = require("./routes/productsRoutes");
const productsApiRoutes = require("./routes/productsApiRoutes");
const entriesApiRoutes = require("./routes/entriesApiRoutes");


// Motor de vistas PUG
app.set('view engine', 'pug');
app.set('views', './views');

//
app.use(express.json());




// Con middleware de acceso para TODAS las rutas:
//app.use(checkApiKey);


// Router de productos
// Con middleware de acceso para las rutas de products
//app.use("/products",checkApiKey, productsRoutes);


// WEB:
app.use("/products", productsRoutes);


// API:
app.use("/api/products", productsApiRoutes);
app.use("/api/entries", entriesApiRoutes);
app.use("/api/authors", entriesApiRoutes);

// WEB:
//http:localhost:3000/products
//http:localhost:3000/products/4


// API:
//http:localhost:3000/api/products GET
//http:localhost:3000/api/products/3 GET
//http:localhost:3000/api/products POST
//http:localhost:3000/api/products DELETE



// HOME
// http://127.0.0.1:3000
// http://localhost:3000
app.get('/', (req, res) => {
    res.send('Hola desde mi primer servidor!')
})

// http://localhost:3000/pokemon/charmander
// http://localhost:3000/pokemon/mew
// http://localhost:3000/pokemon/pikachu
// http://localhost:3000/pokemon/snorlax
app.get('/pokemon/:name?', (req, res) => {
    console.log(req.params);
    if (req.params.name) {
        res.send('Aquí te envío a:' + req.params.name)
    } else {
        res.send('Aquí te envío a todos los pokemon del planeta')
    }
})

app.get('/perritos', (req, res) => {
    res.send('Aquí te enviaría mis perritos')
})


// Middleware error 404
// Respuesta por defecto para rutas no existentes
app.use(manage404);


app.listen(port, () => {
    console.log(`Mi servidor funciona en el puerto ${port}`)
})