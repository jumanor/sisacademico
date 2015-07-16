var mongoose = require('mongoose');
var schema = new mongoose.Schema({

    usuario: String,
    contrasenia: String,
    perfil:String,//Alumno,Profesor
    persona : { type: mongoose.Schema.Types.ObjectId} //Alumno,Profesor
    
});
module.exports=mongoose.model('Login',schema);
