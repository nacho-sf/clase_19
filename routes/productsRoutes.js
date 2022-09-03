const express = require("express");

// Rutas de productos

const productsController = require("../controllers/productsController");
const productsRouter = express.Router();


//const checkApiKey = require('../middlewares/auth_API_KEY');


// Products:
productsRouter.get('/:id?', productsController.getProducts);

/*
// Chequea que tenga apikey antes de postear
productsRouter.post("/" ,checkApiKey, productsController.createProduct);
// Chequea que tenga apikey antes de borrar
productsRouter.delete("/" ,checkApiKey, productsController.deleteProduct);
*/

module.exports = productsRouter;