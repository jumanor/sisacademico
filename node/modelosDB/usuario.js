var mongoose = require('mongoose');
var schema = new mongoose.Schema({

    usuario: String,
    contrasenia: String,
 	perfil:String
});
module.exports=mongoose.model('Usuario',schema);
