const mongoose = require('mongoose');
// Prueba para ver si existe conexión (ya no se necesita)
//mongoose.connect('mongodb://localhost:27017/mydb');

const objectSchema = {
    id: { 
        type: Number,       //Tipado
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
        validate: {         //Validación
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
//Exportar modelo
module.exports = Product;



// Insertar un producto con Mongoose (a MongoDB):
/*
const p = new Product({
    id: 937,
    title: "Tortilla",
    price: 1.80,
    description: "Tortilla jugosa del teatro",
    image:"https://www.recetasderechupete.com/wp-content/uploads/2020/11/Tortilla-de-patatas-4-768x530.jpg"
});

p.save().then((data) => console.log(data))
*/