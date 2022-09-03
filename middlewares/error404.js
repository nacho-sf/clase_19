const manage404 = function (req,res,next) {
    res.status(404).send('Error! 404. Ruta no encontrada :) jajaja ');

};

module.exports = manage404;