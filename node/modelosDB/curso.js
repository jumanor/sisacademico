var mongoose = require('mongoose');
var schemaHorario = new mongoose.Schema({

    dia: String,//Lunes 
    horaIni: String,//13:00
    horaFin: String//13:00
});
var schemaCurso = new mongoose.Schema({
	tipo:String, //TEORIA PRACTICA
    nombre: String,
    horarios:[schemaHorario]
});
module.exports=mongoose.model('Curso',schemaCurso);
