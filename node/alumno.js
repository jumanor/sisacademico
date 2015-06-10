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
		    
		    var idAlumno=data.idAlumno;

			var curso={}
		    	curso.id=1;
		    	curso.nombre='ALGORITMOS';
		    var curso1={}
		    	curso1.id=2;
		    	curso1.nombre='PROGRAMACION';
			
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
		    
		    var idAlumno=data.idAlumno;
		    var idCurso=data.idCurso;

		    var horarios=[];

			var horario={}
		    	horario.id=1;
		    	horario.dia='LUNES';
		    	horario.inicio='08:00';
		    	horario.fin='12:00';
		    	horario.aula='102';
		    	horario.tipo='TEORIA';
		    
		    	horarios[0]=horario;

			var horario={}
		    	horario.id=1;
		    	horario.dia='MARTES';
		    	horario.inicio='07:00';
		    	horario.fin='19:00';
		    	horario.aula='104';
		    	horario.tipo='TEORIA';
				
				horarios[1]=horario;   

			var msn={};
			msn.data=horarios;	
			msn.status=1;
			msn.message=null;
			
		    res.json(msn);
	
		});

};///////////////////////////////////////////////////////////////////////////////////////////////////////////////	