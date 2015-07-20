var async=require("async");
var ProfesorDB=require('./modelosDB/profesor.js');
var CursoDB=require('./modelosDB/curso.js');
var AlumnoDB=require('./modelosDB/alumno.js');
/**
 * Obtenemos todos los Cursos del Profesor por identificador.
 * 
 * @param  {Number} data.idProfesor     Identificador del Profesor
 * 
 * @return {Array} {Number} id  	identificador del curso
 *                 {String} nombre 	nombre del curso        
 */
module.exports.getCursoByIdProfesor=function(idProfesor,callback){

	ProfesorDB.findById(idProfesor).exec(function(err,profesor){

		if(err){
			console.log(err);
			return callback(-1,err);
		}////////////////////////////
		if(profesor==null){
			callback(-1,"PROFESOR NO ENCONTRADO");			
		}
		else{
			var cursos=[];
			var n=profesor.cursos.length;

			for(var i=0;i<n;i++){
				var curso={};
		    	curso.id=profesor.cursos[i].idCurso;
		    	curso.nombre=profesor.cursos[i].nombre;
		    	cursos.push(curso);
			}

			callback(cursos,null);
		}
		
	});

}
/**
 * Obtiene las titulos de las Notas de los Cursos (ejem: PRIMEREXAMEN)
 * 
 * @param  {String}   idProfesor 
 * @param  {String}   idCurso    
 * 
 * @return {Array}	{String} idNotaCabecera
 *                  {String} descripcion 		titulo del examen                      
 */
module.exports.getDescripcionesDeCursoByIdProfesor=function(idProfesor,idCurso,callback){

	ProfesorDB.findById(idProfesor).exec(function(err,profesor){

		if(err){
			console.log(err);
			return callback(-1,err);
		}////////////////////////////
		if(profesor==null){
			callback(-1,"PROFESOR NO ENCONTRADO");			
		}
		else{
		
			var n=profesor.cursos.length;
			var tmp=false;
		
			for(var i=0;i<n;i++){
				if(profesor.cursos[i].idCurso==idCurso){
					tmp=true;
					break;
				}
			}
			if(tmp==true){
					
					CursoDB.findById(idCurso).exec(function(err,curso){
						if(err){
							console.log(err);
							return callback(-1,err);
						}////////////////////////////
						if(curso==null){
							callback(-1,"CURSO NO ENCONTRADO");
						}
						else{

							
							var descripciones=[];
							for(var i=0;i<curso.cabeceraNotas.length;i++){
								var tmp={};
								tmp.idNotaCabecera=curso.cabeceraNotas[i].id;
								tmp.descripcion=curso.cabeceraNotas[i].descripcion;	
								descripciones.push(tmp);	
							}
							
							callback(descripciones,null);
						}
					});
			}
			else{

				callback(-1,"CURSO NO ENCONTRADO");	
			}

		}
		
	});
}//////////////////////////////////////////////////////////////////////////////////////////////////////////	
/**
 * Obtiene todos los Alumnos de un Curso por titulo de su Nota(ejemplo:"PRIMER EXAMEN")
 * @param  {String}   idCurso        
 * @param  {String}   idNotaCabecera  id de la Descripcion (titulo del examen)
 *
 * @return {Array} {String} id 			identificador del Alumno
 *                 {String} idCurso 	identificador del Curso
 *                 {String} nombres			
 *                 {String} apPateno
 *                 {String} apMaterno
 *                 {Number}	nota
 */
module.exports.getAlumnoDeDescripcionesDeCursoByIdCurso=function(idCurso,idNotaCabecera,callback){

	CursoDB.findById(idCurso).exec(function(err,curso){
		if(err){
			console.log(err);
			return callback(-1,err);
		}////////////////////////////
		if(curso==null){
			callback(-1,"CURSO NO ENCONTRADO");	
		}
		else{
			var series=[];
			var alumnos=[];
			for(var i=0;i<curso.alumnos.length;i++){
				series.push(curso.alumnos[i]);
			}

			async.eachSeries(series, function (value,callbackSeries) {//GENERAMOS SINCRONISMO
					
					AlumnoDB.findById(value).exec(function(err,data){
						if(err){
							console.log(err);
							return callbackSeries(err);
						}////////////////////////////
						if(data==null){
							return callbackSeries("ALUMNO NO ENCONTRADO");
						}////////////////////////////
						var alumno={};
						var salida=false;
						for(var j=0;j<data.cursos.length;j++){
							if(data.cursos[j].idCurso==idCurso){

								for(var w=0;w<data.cursos[j].notas.length;w++){
									if(data.cursos[j].notas[w].idNotaCabecera==idNotaCabecera){
										alumno.id=data.id;
										alumno.idCurso=idCurso;
										alumno.nombres=data.nombres;	
										alumno.apPaterno=data.apPaterno;
										alumno.apMaterno=data.apPaterno;
										alumno.nota=data.cursos[j].notas[w].nota;

										alumnos.push(alumno);
										salida=true;
										break;
									}

								}	
							}
							if(salida==true)break;
						}
						callbackSeries();//contrala las llamadas sincronas
					});
					

			},function (err) {

			  if (err){ console.log(err.message);
			  			callback(-1,err);					
			  			}
			  callback(alumnos,null);
			});
		}		
	});
}//////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports.saveAlumnoDeDescripcionesDeCursoByIdCurso=function(alumnos,idCurso,idNotaCabecera,callback){

	
			var series=[];
			
			for(var i=0;i<alumnos.length;i++){
				series.push(alumnos[i].id);
			}

			async.forEachOf(series, function (value,key,callbackSeries) {//GENERAMOS SINCRONISMO
					
					AlumnoDB.findById(value).exec(function(err,data){
						if(err){
							console.log(err);
							return callbackSeries(err);
						}////////////////////////////
						if(data==null){
							return callbackSeries("ALUMNO NO ENCONTRADO");
						}////////////////////////////
						
						var salida=false;
						for(var j=0;j<data.cursos.length;j++){
							if(data.cursos[j].idCurso==idCurso){

								for(var w=0;w<data.cursos[j].notas.length;w++){
									if(data.cursos[j].notas[w].idNotaCabecera==idNotaCabecera){
										
										data.cursos[j].notas[w].nota=alumnos[key].nota;
										data.save(function(err,data){
											if(err)
												callbackSeries(err);//contrala las llamadas sincronas
											else{
												callbackSeries();
												//salida=true;
												//break;		
											}
										});
									}

								}	
							}
							if(salida==true)break;
						}
						
					});
					

			},function (err) {

			  if (err){ console.log(err.message);
			  			callback(-1,err);					
			  			}
			  			
			  callback({estado:1},null);
			});
	
}//////////////////////////////////////////////////////////////////////////////////////////////////////////
















