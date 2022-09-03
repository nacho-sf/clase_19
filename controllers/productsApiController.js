// Controlador - Lógica de negocio de la app
const fetch =  require("node-fetch");
const Product = require("../models/products");

const getProducts = async (req, res) => {
    if (req.params.id) {  // FIND BY ID
        try {
            let product =  await Product.find({id:req.params.id},'title price id -_id'); // Se filtra por lo que se quiere, y por lo que se quiere quitar
            res.status(200).json(product);
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).json({"message":"producto no encontrado"});
        }
    } else { // FIND ALL
        try {
            let products = await Product.find({},'title price id -_id').sort({'id':'desc'}); // Se filtra por lo que se quiere, y por lo que se quiere quitar
            res.status(200).json( {products});
        }
        catch (error) {
            console.log(`ERROR: ${error.stack}`);
            res.status(404).json( {products});
        }
    }
}


const createProduct = async (req, res) => {
    console.log("Esto es el consol.log de lo que introducimos por postman",req.body); // Objeto recibido de producto nuevo
    const product = req.body; // {} nuevo producto a guardar

    // Líneas
    //para guardar 
    // en una BBDD SQL o MongoDB
try{
    let product = new Product(req.body); // Crear el objeto producto con los nuevos datos del producto
    let answer = await product.save(); // Guardar objeto en MongoDB
    console.log("Este es el console.log de lo que devuelve la api",answer);
    res.status(201).json({"message":` Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`});

}catch(error){
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({"message":` Error guardando producto ${answer.title}`});
}
}


const deleteProduct = async (req,res)=>{
    const msj ="Has enviado un DELETE para borrar product";
    console.log(msj);
    res.send(msj);
}

module.exports = {
getProducts,
createProduct,
deleteProduct
//editProduct,
}







// OTRA MANERA

// const products = {
//     getProducts: async (req, res) => {
//         if (req.params.id) {
//             try {
//                 let response = await fetch(`https://fakestoreapi.com/products/${req.params.id}`); //{}
//                 let products = await response.json(); //{}
//                 res.render('products', { "products": [products] }); // Pinta datos en el pug
//             }
//             catch (error) {
//                 console.log(`ERROR: ${error.stack}`);
//             }
//         } else {
//             try {
//                 let response = await fetch(`https://fakestoreapi.com/products`); // []
//                 let products = await response.json(); // []
//                 res.render('products', { products }); // Pinta datos en el pug
//             }
//             catch (error) {
//                 console.log(`ERROR: ${error.stack}`);
//             }
//         }
//     },
//     createProduct: async (req, res) => {
//         console.log("Esto es el consol.log de lo que introducimos por postman",req.body); // Objeto recibido de producto nuevo
//         const newProduct = req.body; // {} nuevo producto a guardar
    
//         // Líneas
//         //para guardar 
//         // en una BBDD SQL o MongoDB
    
//         let response = await fetch('https://fakestoreapi.com/products', {
//             method: "POST",
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newProduct)
//         })
//         let answer = await response.json(); // objeto de vuelta de la petición
//         console.log("Este es el console.log de lo que devuelve la api",answer);
    
//         res.send(`Producto ${answer.title} guardado en el sistema con ID: ${answer.id}`);
//     },
//     deleteProduct: async (req, res) =>  console.log("Borrando pruducto"),
//     editProduct: async (req, res) =>  console.log("Borrando pruducto")
// }

// module.exports = products;