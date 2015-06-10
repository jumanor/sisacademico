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
		    
		    var idProfesor=data.idProfesor;

			var curso={}
		    	curso.id=1;
		    	curso.nombre='MATEMATICA I';
		    var curso1={}
		    	curso1.id=2;
		    	curso1.nombre='FISICA II';
			
		    var cursos=[];
		    	cursos[0]=curso;
		    	cursos[1]=curso1;

			var msn={};
			msn.data=cursos;	
			msn.status=1;
			msn.message=null;
			
		    res.json(msn);
			
		});
		
};///////////////////////////////////////////////////////////////////////////////////////////////////////////////	