var ALUMNO_DAO=require('./alumnoDAO.js');
/**
 * Obtenemos todos los Cursos del Alumno por identificador.
 * 
 * @param  {Number} data.idAlumno     Identificador del Alumno
 * 
 * @return {Array} {Number} id  	identificador del curso
 *                 {String} nombre 	nombre del curso        
 */
module.exports.getCursoByIdAlumno=function(app){

	app.post('/getCursoByIdAlumno', function(req, res){	
		
	    var data=req.param('data');
	    data=JSON.parse(data);
	    //console.log(data);	
	    
	    ALUMNO_DAO.getCursoByIdAlumno(data.idAlumno,function(respuesta,mensaje){

	    		var msn={};
				msn.data=respuesta;
				msn.status=1;
				msn.message=null;

				if(respuesta < 0){
						 
					msn.status=0;
					msn.message={codigo:respuesta,message:mensaje};
		
				}
					
				res.json(msn);

	    });		
	});

};///////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
module.exports.getHorariosDeCursoByIdAlumno=function(app){
 
	app.post('/getHorariosDeCursoByIdAlumno', function(req, res){	
		
	    var data=req.param('data');
	    data=JSON.parse(data);
	    //console.log(data);	
	    
	    ALUMNO_DAO.getHorariosDeCursoByIdAlumno(data.idAlumno,data.idCurso,function(respuesta,mensaje){

	    		var msn={};
				msn.data=respuesta;
				msn.status=1;
				msn.message=null;

				if(respuesta < 0){
						 
					msn.status=0;
					msn.message={codigo:respuesta,message:mensaje};
		
				}
					
				res.json(msn);

	    });		
	});	

};///////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
module.exports.getNotasDeCursoByIdAlumno=function(app){

	app.post('/getNotasDeCursoByIdAlumno', function(req, res){	
		
	    var data=req.param('data');
	    data=JSON.parse(data);
	    //console.log(data);	
	    
	    ALUMNO_DAO.getNotasDeCursoByIdAlumno(data.idAlumno,data.idCurso,function(respuesta,mensaje){

	    		var msn={};
				msn.data=respuesta;
				msn.status=1;
				msn.message=null;

				if(respuesta < 0){
						 
					msn.status=0;
					msn.message={codigo:respuesta,message:mensaje};
		
				}
					
				res.json(msn);

	    });		
	});	

};///////////////////////////////////////////////////////////////////////////////////////////////////////////////	
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
module.exports.getAsistenciasDeCursoByIdAlumno=function(app){

	app.post('/getAsistenciasDeCursoByIdAlumno', function(req, res){	
		
	    var data=req.param('data');
	    data=JSON.parse(data);
	    //console.log(data);	
	    
	    ALUMNO_DAO.getAsistenciasDeCursoByIdAlumno(data.idAlumno,data.idCurso,function(respuesta,mensaje){

	    		var msn={};
				msn.data=respuesta;
				msn.status=1;
				msn.message=null;

				if(respuesta < 0){
						 
					msn.status=0;
					msn.message={codigo:respuesta,message:mensaje};
		
				}
					
				res.json(msn);

	    });		
	});	

};///////////////////////////////////////////////////////////////////////////////////////////////////////////////	