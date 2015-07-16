var AlumnoDB=require('./modelosDB/alumno.js');
var CursoDB=require('./modelosDB/curso.js');
/**
 * Obtenemos todos los Cursos del Alumno por identificador.
 * 
 * @param  {Number} data.idAlumno     Identificador del Alumno
 * 
 * @return {Array} {Number} id  	identificador del curso
 *                 {String} nombre 	nombre del curso        
 */
module.exports.getCursoByIdAlumno=function(idAlumno,callback){

	AlumnoDB.findById(idAlumno).exec(function(err,alumno){

		if(err){
			console.log(err);
			return callback(-1,err);
		}////////////////////////////
		if(alumno==null){
			callback(-1,"ALUMNO NO ENCONTRADO");			
		}
		else{
			var cursos=[];
			var n=alumno.cursos.length;

			for(var i=0;i<n;i++){
				var curso={};
		    	curso.id=alumno.cursos[i].idCurso;
		    	curso.nombre=alumno.cursos[i].nombre;
		    	cursos.push(curso);
			}

			callback(cursos,null);
		}
		
	});
}
/**
 * Obtenemos todos los Horarios de un determinado Curso por Id de Alumno
 * 
 * @param  {Number} data.idAlumno     
 * @param  {Number} data.idCurso      
 * 
 * @return {Array}  {Number} id
 *                  {String} dia
 *                  {String} inicio
 *                  {String} fin
 *                  {String} aula
 *                  {String} tipo         
 */
module.exports.getHorariosDeCursoByIdAlumno=function(idAlumno,idCurso,callback){

	AlumnoDB.findById(idAlumno).exec(function(err,alumno){

		if(err){
			console.log(err);
			return callback(-1,err);
		}////////////////////////////
		if(alumno==null){
			callback(-1,"ALUMNO NO ENCONTRADO");			
		}
		else{
			var cursos=[];
			var n=alumno.cursos.length;

			var tmp=false;
			for(var i=0;i<n;i++){
				if(alumno.cursos[i].idCurso==idCurso){
					tmp=true;	
					break;
				}
				
			}
			if(tmp===true){
				CursoDB.findById(idCurso).exec(function(err,curso){
						if(err){
							console.log(err);
							return callback(-1,err);
						}////////////////////////////
						var horarios=[];
						for(var j=0;j<curso.horarios.length;j++){
							var horario={};

							horario.id=curso.horarios[j].id;
		    				horario.dia=curso.horarios[j].dia;
					    	horario.inicio=curso.horarios[j].horaIni;
					    	horario.fin=curso.horarios[j].horaFin;
					    	horario.aula=curso.aula;
					    	horario.tipo=curso.tipo;

							horarios.push(horario);
						}

					callback(horarios,null);	
				});
			}
			else{
				callback(-1,"CURSO NO ENCONTRADO");
			}
		}
		
	});

}
/**
 * Obtenemos todos las Notas de un determinado Curso por Id de Alumno
 * 
 * @param  {Number} data.idAlumno     
 * @param  {Number} data.idCurso      
 * 
 * @return {Array}  {Number} id
 *                  {String} nota
 *                  {String} fecha
 *                  {String} tipo
 *                  {String} comentario
 *                       
 */
module.exports.getNotasDeCursoByIdAlumno=function(idAlumno,idCurso,callback){

	AlumnoDB.findById(idAlumno).exec(function(err,alumno){

		if(err){
			console.log(err);
			return callback(-1,err);
		}////////////////////////////
		if(alumno==null){
			callback(-1,"ALUMNO NO ENCONTRADO");			
		}
		else{
			
			var n=alumno.cursos.length;

			var tmp=false;
			var index=null;
			for(var i=0;i<n;i++){
				if(alumno.cursos[i].idCurso==idCurso){
					tmp=true;
					index=i;
					break;
				}
			}
			if(tmp==true){
					var notas=[];
					for(var j=0;j<alumno.cursos[index].notas.length;j++){
						var nota={};
						nota.id=alumno.cursos[index].notas[j].id;
						nota.nota=alumno.cursos[index].notas[j].nota;
						nota.fecha=alumno.cursos[index].notas[j].fecha;
						nota.tipo=alumno.cursos[index].tipo;
						nota.comentario=alumno.cursos[index].notas[j].descripcion;
						notas.push(nota);
					}

					callback(notas,null);	
			}
			else{
				callback(-1,"CURSO NO ENCONTRADO");	
			}

		}
		
	});
}
/**
 * Obtenemos todos las Asistencias de un determinado Curso por Id de Alumno
 * 
 * @param  {Number} data.idAlumno     
 * @param  {Number} data.idCurso      
 * 
 * @return {Array}  {Number} 	id
 *                  {String} 	fecha
 *                  {Boolean} 	estado
 *                  {String} 	comentario
 *                       
 */
module.exports.getAsistenciasDeCursoByIdAlumno=function(idAlumno,idCurso,callback){

	AlumnoDB.findById(idAlumno).exec(function(err,alumno){

		if(err){
			console.log(err);
			return callback(-1,err);
		}////////////////////////////
		if(alumno==null){
			callback(-1,"ALUMNO NO ENCONTRADO");			
		}
		else{
			
			var n=alumno.cursos.length;

			var tmp=false;
			var index=null;
			for(var i=0;i<n;i++){
				if(alumno.cursos[i].idCurso==idCurso){
					tmp=true;
					index=i;
					break;
				}
			}
			if(tmp==true){
					var notas=[];
					for(var j=0;j<alumno.cursos[index].asistencias.length;j++){
						var nota={};
						nota.id=alumno.cursos[index].asistencias[j].id;
						nota.fecha=alumno.cursos[index].asistencias[j].fecha;
						nota.estado=alumno.cursos[index].asistencias[j].asistencia;
						nota.comentario=alumno.cursos[index].asistencias[j].comentario;
						notas.push(nota);
					}

					callback(notas,null);	
			}
			else{
				callback(-1,"CURSO NO ENCONTRADO");	
			}

		}
		
	});
}	