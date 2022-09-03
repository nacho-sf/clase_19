const express = require("express");

// Rutas de productos

const productsApiController = require("../controllers/productsApiController");
const productsApiRouter = express.Router();


const checkApiKey = require('../middlewares/auth_API_KEY');


// Products:
productsApiRouter.get('/:id?', productsApiController.getProducts);
// Chequea que tenga apikey antes de postear
productsApiRouter.post("/" ,checkApiKey, productsApiController.createProduct);
// Chequea que tenga apikey antes de borrar
productsApiRouter.delete("/" ,checkApiKey, productsApiController.deleteProduct);


module.exports = productsApiRouter;

//http://localhost:3000/api/products --> GET /products
//http://localhost:3000/api/products --> POST /products
//http://localhost:3000/api/products --> DELETE /products