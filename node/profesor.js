var PROFESOR_DAO=require('./profesorDAO.js');
/**
 * Obtenemos todos los Cursos del Profesor por identificador.
 * 
 * @param  {Number} data.idProfesor     Identificador del Profesor
 * 
 * @return {Array} {Number} id  	identificador del curso
 *                 {String} nombre 	nombre del curso        
 */
module.exports.getCursoByIdProfesor=function(app){

		app.post('/getCursoByIdProfesor', function(req, res){	
	
		    var data=req.param('data');
		    data=JSON.parse(data);
		    //console.log(data);	
		    
		     PROFESOR_DAO.getCursoByIdProfesor(data.idProfesor,function(respuesta,mensaje){

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
module.exports.getDescripcionesDeCursoByIdProfesor=function(app){

		app.post('/getDescripcionesDeCursoByIdProfesor', function(req, res){	
	
		    var data=req.param('data');
		    data=JSON.parse(data);
		    //console.log(data);	
		    
		     PROFESOR_DAO.getDescripcionesDeCursoByIdProfesor(data.idProfesor,data.idCurso,function(respuesta,mensaje){

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
module.exports.getAlumnoDeDescripcionesDeCursoByIdCurso=function(app){

		app.post('/getAlumnoDeDescripcionesDeCursoByIdCurso', function(req, res){	
	
		    var data=req.param('data');
		    data=JSON.parse(data);
		    //console.log(data);	
		    
		     PROFESOR_DAO.getAlumnoDeDescripcionesDeCursoByIdCurso(data.idCurso,data.idNotaCabecera,function(respuesta,mensaje){

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
module.exports.saveAlumnoDeDescripcionesDeCursoByIdCurso=function(app){

		app.post('/saveAlumnoDeDescripcionesDeCursoByIdCurso', function(req, res){	
	
		    var data=req.param('data');
		    data=JSON.parse(data);
		    //console.log(data);	
		    
		     PROFESOR_DAO.saveAlumnoDeDescripcionesDeCursoByIdCurso(data.alumnos,data.idCurso,data.idNotaCabecera,function(respuesta,mensaje){

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
module.exports.newDescripcionDeCursoByIdCurso=function(app){

		app.post('/newDescripcionDeCursoByIdCurso', function(req, res){	
	
		    var data=req.param('data');
		    data=JSON.parse(data);
		    //console.log(data);	
		    
		     PROFESOR_DAO.newDescripcionDeCursoByIdCurso(data.idCurso,data.descripcion,function(respuesta,mensaje){

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
module.exports.getDescripcionesDeCursoAsistenciaByIdProfesor=function(app){

		app.post('/getDescripcionesDeCursoAsistenciaByIdProfesor', function(req, res){	
	
		    var data=req.param('data');
		    data=JSON.parse(data);
		    //console.log(data);	
		    
		     PROFESOR_DAO.getDescripcionesDeCursoAsistenciaByIdProfesor(data.idProfesor,data.idCurso,function(respuesta,mensaje){

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
module.exports.getAlumnoDeDescripcionesDeAsistenciaByIdProfesor=function(app){

		app.post('/getAlumnoDeDescripcionesDeAsistenciaByIdProfesor', function(req, res){	
	
		    var data=req.param('data');
		    data=JSON.parse(data);
		    //console.log(data);	
		    
		     PROFESOR_DAO.getAlumnoDeDescripcionesDeAsistenciaByIdProfesor(data.idCurso,data.idAsistenciaCabecera,function(respuesta,mensaje){

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
module.exports.newDescripcionDeAsistenciaByIdCurso=function(app){

		app.post('/newDescripcionDeAsistenciaByIdCurso', function(req, res){	
	
		    var data=req.param('data');
		    data=JSON.parse(data);
		    //console.log(data);	
		    
		     PROFESOR_DAO.newDescripcionDeAsistenciaByIdCurso(data.idCurso,data.descripcion,function(respuesta,mensaje){

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
module.exports.saveAlumnoDeDescripcionesDeCursoAsistenciaByIdCurso=function(app){

		app.post('/saveAlumnoDeDescripcionesDeCursoAsistenciaByIdCurso', function(req, res){	
	
		    var data=req.param('data');
		    data=JSON.parse(data);
		    //console.log(data);	
		    
		     PROFESOR_DAO.saveAlumnoDeDescripcionesDeCursoAsistenciaByIdCurso(data.alumnos,data.idCurso,data.idAsistenciaCabecera,function(respuesta,mensaje){

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