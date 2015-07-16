var mongoose = require('mongoose');

var schemaAsistencia = new mongoose.Schema({
	asistencia:Boolean,
	comentario:String,
	fecha:Date
});
var schemaNota = new mongoose.Schema({
	nota: Number,
	fecha:Date,
	descripcion:String
});
var schemaCurso = new mongoose.Schema({
	idCurso:{ type: mongoose.Schema.Types.ObjectId}, //Id del Curso
	nombre:String, //Nombre del Curso	
	tipo:String,	//TEORIA PRACTICA
	notas : [schemaNota],
	asistencias : [schemaAsistencia]
});
var schemaAlumno = new mongoose.Schema({

    nombres: String,
    apPaterno: String,
    apMaterno:String,	
    cursos : [schemaCurso]
});
module.exports=mongoose.model('Alumno',schemaAlumno);
