const entry = require("../models/entry")

//getEntries()
//    if (existe email)
//else
//    busca todo







// GET http://localhost:3000/api/entries -> ALL
// GET http://localhost:3000/entries?email=hola@gmail.com -> Por email

const getEntries = async (req, res) => {
    let entries;
    try {
        if (req.query.email) {
            entries = await entry.getEntriesByEmail(req.query.email);
            res.status(200).json(entries); // [array] con las entries encontradas        }
        }else {
            entries = await entry.getAllEntries();
            res.status(200).json(entries);
        };
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
};





/*
//createEntry()
// POST http://localhost:3000/api/entries
/*
let newEntry = {
    title:"Nos gustan las tortillas",
    content:"En el Marquina las tortillas vuelan",
    email:"albertu@thebridgeschool.es",
    category:"gastronomía"
}
*/
/*
// Crear entry por email:
const createEntry = async (req,res) => {
    console.log(req.body);
    const newEntry = req.body; // {tilte, content, email, category}
    const response = await entry.createEntry(newEntry);
    res.status(200).json({"saved":response});
};
*/






//updateEntry()
// PUT http://localhost:3000/api/entries
/*
{
    "title":"Título",
    "new_title":"Vacaciones en The Bridge",
    "content":"contendo",
    "category":"summer"
}
*/
// Actualizar entry por título:
const updateEntry = async (req, res) => {
    
    try {
        console.log(req.body);
        const newEntry = req.body; // {tilte,new_title,content,category}
        const response = await entry.updateEntry(newEntry);
        res.status(200).json({"saved":response});

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};






//deleteEntry()
// PUT http://localhost:3000/api/entries
/*
{
    "title":"Título"
}
*/
// Borrar entry por título:
const deleteEntry = async (req, res) => {
    
    try {
        console.log(req.body);
        const newEntry = req.body; // {tilte}
        const response = await entry.deleteEntry(newEntry);
        res.status(200).json({'message: Se ha borrado la entry: ':newEntry.title});

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};



/*
// GET http://localhost:3000/api/authors -> ALL

const getAllAuthors = async (req, res) => {
    let authors;
    try {
        authors = await entry.getAllAuthors();
        res.status(200).json(authors);
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
};
*/





// GET http://localhost:3000/api/authors -> ALL
// GET http://localhost:3000/api/authors?email=hola@gmail.com -> Por email

const getAuthors = async (req, res) => {
    let authors;
    try {
        if (req.query.email) {
            authors = await entry.getAuthorsByEmail(req.query.email);
            res.status(200).json(authors); // [array] con las authors encontradas        }
        }else {
            authors = await entry.getAllAuthors();
            res.status(200).json(authors);
        };
    } catch (error) {
        console.log(error);
        res.status(400).json(error)
    }
};







//createAuthor()
// POST http://localhost:3000/api/authors
/*
let newAuthor = {
    id: 6,
    name:"Pepe",
    surname:"Villegas",
    email:"pepe@mail.com",
    image:"https://randomuser.me/api/portraits/men/10.jpg"
}
*/
// Crear author:
const createAuthor = async (req,res) => {
    try {
    console.log(req.body);
    const newAuthor = req.body; // {id_author, name, surname, email, image}
    const response = await newAuthor.createAuthor(newAuthor);
    res.status(201).json({"saved":response});

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};






module.exports = {
    getEntries,
    //createEntry,
    updateEntry,
    deleteEntry,
    getAuthors,
    createAuthor
    }