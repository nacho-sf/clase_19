// Para hacer restricciones de acceso

//http://localhost:3000/api/products?API_KEY=12354djd

const checkApiKey = function(req,res,next) {

    // Comprobar si existe API KEY en BBDD
    //...
    if(req.query.API_KEY==="12354djd") {
        next(); // Pasa a la siguiente tarea que toque
    }else{
        res.status(401).send("Error. API KEY no proveída");
    }
}

module.exports = checkApiKey;