var IPADDRESS="192.168.56.1";
var PORT=9095
var express = require('express');
var bodyParser = require('body-parser');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,x-access-token');
   
    next();
}

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);

var server = app.listen(PORT,IPADDRESS);
console.log('Escuchando en '+IPADDRESS+':'+PORT);
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Metodo para autenticarse en el sistema
 * 
 * @param  {String} data.usuario      
 * @param  {String} data.contrasenia
 * 
 * @return {Object} {Number} id 				identificador de usuario
 *                  {String} usuario 			nombre de usuario
 *                  {String} identificador 		identificador del alumno o profesor o administrador
 *                  {String} nombres 			nombres del alumno o profesor o administrador
 *                  {String} apellidos 			apellidos del alumno o profesor o administrador          
 */
app.post('/getLogin', function(req, res){	
	
    var data=req.param('data');
    data=JSON.parse(data);
    //console.log(data);	
    if(data.usuario!=="jumanor" || data.contrasenia!=="jumanor"){

	var msn={};
	msn.data=null;	
	msn.status=0;
	msn.message="NO AUTENTICADO";
    }
    else{
    	var identificador=null;
	    if(data.perfil=="Alumno"){
	    	identificador=1;

	    }
	    if(data.perfil=="Profesor"){
	    	identificador=2;
	    	
	    }
	    if(data.perfil=="Administrador"){
			identificador=3;
	    	
	    }	

		var user={}
	    	user.id=1;
	    	user.usuario='jumanor';
	    	
	    	user.identificador=identificador;
	    	user.nombres="CARLOS";
	    	user.apellidos="CENTENO CENTENO";

		var msn={};
		msn.data=user;	
		msn.status=1;
		msn.message=null;
	
   }				
	        
   res.json(msn);
	
});///////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Obtenemos todos los Cursos del Alumno por identificador.
 * 
 * @param  {Number} data.idAlumno     Identificador del Alumno
 * 
 * @return {Array} {Number} id  	identificador del curso
 *                 {String} nombre 	nombre del curso        
 */
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
/**
 * Obtenemos todos los Cursos del Profesor por identificador.
 * 
 * @param  {Number} data.idProfesor     Identificador del Profesor
 * 
 * @return {Array} {Number} id  	identificador del curso
 *                 {String} nombre 	nombre del curso        
 */
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
