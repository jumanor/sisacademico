var mongoose = require('mongoose');
var schemaHorario = new mongoose.Schema({

    dia: String,//Lunes 
    horaIni: String,//13:00
    horaFin: String//13:00
});
var schemaCabeceraNota = new mongoose.Schema({
	descripcion:String
});
var schemaCurso = new mongoose.Schema({

    aula:String,
    tipo:String, //TEORIA PRACTICA
    nombre: String,
    horarios:[schemaHorario],
    cabeceraNotas:[schemaCabeceraNota],
    alumnos:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Alumno' }]	
});
module.exports=mongoose.model('Curso',schemaCurso);
