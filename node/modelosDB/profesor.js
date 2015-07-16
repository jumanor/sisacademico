var mongoose = require('mongoose');

var schemaCurso = new mongoose.Schema({
	idCurso:{ type: mongoose.Schema.Types.ObjectId}, //Id del Curso
	tipo:String,
	nombre:String //Nombre del Curso
});
var schemaProfesor = new mongoose.Schema({

    nombres: String,
    apPaterno: String,
    apMaterno:String,	
    cursos : [schemaCurso]

});
module.exports=mongoose.model('Profesor',schemaProfesor);
