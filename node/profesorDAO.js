"use strict";
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
/**
 * Guarda los notas del alumno
 * 
 * @param  {Array}		alumnos {String} id 	identificador del alumno
 *                            	{String} notas 	nota del alumno
 * @param  {String}		idCurso        
 * @param  {String}		idNotaCabecera 
 * 
 * @return {Array}		{Number} estado                 
 */
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
													
											}
										});
										salida=true;
										break;	
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
module.exports.newDescripcionDeCursoByIdCurso=function(idCurso,descripcion,callback){
	var fecha=Date.now();
	
	CursoDB.findById(idCurso).exec(function(err,curso){
		if(err){
				console.log(err);
				return callback(-1,err);
		}////////////////////////////
		if(curso==null){
			return callback(-1,"CURSO NO ENCONTRADO");
		}
		
		curso.cabeceraNotas.push({descripcion:descripcion});
		curso.save(function(err,data){
			if(err){
				console.log(err);
				return callback(-1,err);
			}////////////////////////////
			var idNotaCabecera=data.cabeceraNotas[data.cabeceraNotas.length-1].id;
			var param=[];

			for(var w=0;w<curso.alumnos.length;w++){
				param.push({_id:curso.alumnos[w]});
			}
			
			AlumnoDB.find().or(param).exec(function(err,alumnos){
				if(err){
					console.log(err);
					return callback(-1,err);
				}////////////////////////////
				
				if(alumnos.length==0){
					callback(-1,"NO HAY ALUMNOS");
				}
				else{
						var series=[];
						for(var i=0;i<alumnos.length;i++){
							series.push(i);
							for(var j=0;j<alumnos[i].cursos.length;j++){
								if(alumnos[i].cursos[j].idCurso==idCurso){
									alumnos[i].cursos[j].notas.push({nota:0,fecha:fecha,descripcion:descripcion,idNotaCabecera:idNotaCabecera});
									
								}

							}
						}
						async.each(series,function(value,callbackSeries){
							alumnos[value].save(function(err,data){
								if(err)
									callbackSeries(err);
								
								callbackSeries();		
							});

						},function (err){
							  if (err){ console.log(err.message);
							  			callback(-1,err);					
							  }
							  callback({idNotaCabecera:idNotaCabecera,descripcion:descripcion},null);
						});

				}
			});
		});
		
	});
}//////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Obtiene las descripciones de las Asistencias de los Cursos (ejem: 01-06-2015)
 * 
 * @param  {String}   idProfesor 
 * @param  {String}   idCurso    
 * 
 * @return {Array}	{String} idAsistenciaCabecera
 *                  {String} fecha 					descripcion(fecha) que se tomo la asistencia.                      
 */
module.exports.getDescripcionesDeCursoAsistenciaByIdProfesor=function(idProfesor,idCurso,callback){

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
							for(var i=0;i<curso.cabeceraAsistencias.length;i++){
								var tmp={};
								tmp.idAsistenciaCabecera=curso.cabeceraAsistencias[i].id;
								tmp.descripcion=curso.cabeceraAsistencias[i].descripcion;	
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
 * Obtiene todos los Alumnos de un Curso por titulo de su Asistencia(ejemplo:"20-06-2015")
 * @param  {String}   idCurso        
 * @param  {String}   idAsistenciaCabecera  id de la Descripcion
 *
 * @return {Array} {String} 	id 			identificador del Alumno
 *                 {String} 	idCurso 	identificador del Curso
 *                 {String} 	nombres			
 *                 {String} 	apPateno
 *                 {String} 	apMaterno
 *                 {Boolean}	asistencia
 */
module.exports.getAlumnoDeDescripcionesDeAsistenciaByIdProfesor=function(idCurso,idAsistenciaCabecera,callback){

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
								
								for(var w=0;w<data.cursos[j].asistencias.length;w++){
									if(data.cursos[j].asistencias[w].idAsistenciaCabecera==idAsistenciaCabecera){
										alumno.id=data.id;
										alumno.idCurso=idCurso;
										alumno.nombres=data.nombres;	
										alumno.apPaterno=data.apPaterno;
										alumno.apMaterno=data.apPaterno;
										alumno.asistencia=data.cursos[j].asistencias[w].asistencia;

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
/**
 * Guarda los notas del alumno
 * 
 * @param  {Array}		alumnos {String} id 	identificador del alumno
 *                            	{String} notas 	nota del alumno
 * @param  {String}		idCurso        
 * @param  {String}		idAsistenciaCabecera 
 * 
 * @return {Array}		{Number} estado                 
 */
module.exports.saveAlumnoDeDescripcionesDeCursoAsistenciaByIdCurso=function(alumnos,idCurso,idAsistenciaCabecera,callback){

	
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

								for(var w=0;w<data.cursos[j].asistencias.length;w++){
									if(data.cursos[j].asistencias[w].idAsistenciaCabecera==idAsistenciaCabecera){
										
										data.cursos[j].asistencias[w].asistencia=alumnos[key].asistencia;
										data.save(function(err,data){
											if(err)
												callbackSeries(err);//contrala las llamadas sincronas
											else{
												callbackSeries();
													
											}
										});
										salida=true;
										break;	
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
module.exports.newDescripcionDeAsistenciaByIdCurso=function(idCurso,descripcion,callback){
	var fecha=Date.now();
	
	CursoDB.findById(idCurso).exec(function(err,curso){
		if(err){
				console.log(err);
				return callback(-1,err);
		}////////////////////////////
		if(curso==null){
			return callback(-1,"CURSO NO ENCONTRADO");
		}
		
		curso.cabeceraAsistencias.push({descripcion:descripcion});
		curso.save(function(err,data){
			if(err){
				console.log(err);
				return callback(-1,err);
			}////////////////////////////
			var idAsistenciaCabecera=data.cabeceraAsistencias[data.cabeceraAsistencias.length-1].id;
			var param=[];

			for(var w=0;w<curso.alumnos.length;w++){
				param.push({_id:curso.alumnos[w]});
			}
			
			AlumnoDB.find().or(param).exec(function(err,alumnos){
				if(err){
					console.log(err);
					return callback(-1,err);
				}////////////////////////////
				
				if(alumnos.length==0){
					callback(-1,"NO HAY ALUMNOS");
				}
				else{
						var series=[];
						for(var i=0;i<alumnos.length;i++){
							series.push(i);
							for(var j=0;j<alumnos[i].cursos.length;j++){
								if(alumnos[i].cursos[j].idCurso==idCurso){
									alumnos[i].cursos[j].asistencias.push({asistencia:false,fecha:fecha,descripcion:descripcion,idAsistenciaCabecera:idAsistenciaCabecera});
									
								}

							}
						}
						async.each(series,function(value,callbackSeries){
							alumnos[value].save(function(err,data){
								if(err)
									callbackSeries(err);
								
								callbackSeries();		
							});

						},function (err){
							  if (err){ console.log(err.message);
							  			callback(-1,err);					
							  }
							  callback({idAsistenciaCabecera:idAsistenciaCabecera,descripcion:descripcion},null);
						});

				}
			});
		});
		
	});
}//////////////////////////////////////////////////////////////////////////////////////////////////////////














