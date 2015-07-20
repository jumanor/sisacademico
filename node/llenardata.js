var mongoose = require('mongoose');
var async=require("async");

mongoose.connect('mongodb://localhost/sisacademico',function(){
    
    mongoose.connection.db.dropDatabase(function(err,result){
	if(err)console.log(err);
	else{
	   cargarData();	
	}
   });
});

///////////////////////////////////////////////////////////////////////////////////////
var AlumnoDB=require('./modelosDB/alumno.js');
var LoginDB=require('./modelosDB/login.js');
var ProfesorDB=require('./modelosDB/profesor.js');
var CursoDB=require('./modelosDB/curso.js');

var CURSO1=null;
var CURSO2=null;
var CURSO3=null;

var ALUMNO=null;
var PROFESOR=null;

function cargarData(){
   console.log("Iniciando Carga");
    async.series([
	function(callback){
           
		  var tmp=new CursoDB({nombre:'MATEMATICA I'});
		  tmp.tipo="TEORIA";
      tmp.aula="101";
		  tmp.horarios.push({dia:"LUNES",horaIni:"13:00",horaFin:"15:00"});
		  tmp.horarios.push({dia:"MARTES",horaIni:"15:00",horaFin:"17:00"});

      tmp.cabeceraNotas.push({descripcion:"PRIMER EXAMEN"});
      tmp.cabeceraNotas.push({descripcion:"SEGUNDO EXAMEN"});
      tmp.cabeceraNotas.push({descripcion:"TERCER EXAMEN"});

		  CURSO1=tmp;
			
			var tmp1=new CursoDB({nombre:'PROGRAMACION III'});
			tmp1.tipo="TEORIA";
      tmp1.aula="102";
			tmp1.horarios.push({dia:"LUNES",horaIni:"10:00",horaFin:"12:00"});
		  tmp1.horarios.push({dia:"MIERCOLES",horaIni:"16:00",horaFin:"18:00"});

      tmp1.cabeceraNotas.push({descripcion:"PRIMER EXAMEN"});
      tmp1.cabeceraNotas.push({descripcion:"SEGUNDO EXAMEN"});
      tmp1.cabeceraNotas.push({descripcion:"TERCER EXAMEN"});

			CURSO2=tmp1;

			var tmp2=new CursoDB({nombre:'FISICA II'});
			tmp2.tipo="TEORIA";
      tmp2.aula="103";
			tmp2.horarios.push({dia:"JUEVES",horaIni:"07:00",horaFin:"10:00"});
		  tmp2.horarios.push({dia:"VIERNES",horaIni:"14:00",horaFin:"15:00"});

      tmp2.cabeceraNotas.push({descripcion:"PRIMER EXAMEN"});
      tmp2.cabeceraNotas.push({descripcion:"SEGUNDO EXAMEN"});
      tmp2.cabeceraNotas.push({descripcion:"TERCER EXAMEN"});
  
			CURSO3=tmp2;

			    tmp.save(function(){
					tmp1.save(function(){
						tmp2.save(callback);
					});
				});
            
        },
        function(callback){
        	
          var fecha=new Date(2015, 06, 17);
          var fecha1=new Date(2015, 06, 18);
          var fecha2=new Date(2015, 06, 19);          

           var notas=[];//CURSO01
           notas.push({idNotaCabecera:CURSO1.cabeceraNotas[0].id,nota:13,descripcion:'PRIMER EXAMEN',fecha:fecha});
           notas.push({idNotaCabecera:CURSO1.cabeceraNotas[1].id,nota:15,descripcion:'SEGUNDO EXAMEN',fecha:fecha1});
           notas.push({idNotaCabecera:CURSO1.cabeceraNotas[2].id,nota:17,descripcion:'TERCER EXAMEN',fecha:fecha2});

			var notas1=[];//CURSO02
           notas1.push({idNotaCabecera:CURSO2.cabeceraNotas[0].id,nota:11,descripcion:'PRIMER EXAMEN',fecha:fecha});
           notas1.push({idNotaCabecera:CURSO2.cabeceraNotas[1].id,nota:10,descripcion:'SEGUNDO EXAMEN',fecha:fecha1});
           notas1.push({idNotaCabecera:CURSO2.cabeceraNotas[2].id,nota:09,descripcion:'TERCER EXAMEN',fecha:fecha2});

			var notas2=[];//CURSO03
           notas2.push({idNotaCabecera:CURSO3.cabeceraNotas[0].id,nota:17,descripcion:'PRIMER EXAMEN',fecha:fecha});
           notas2.push({idNotaCabecera:CURSO3.cabeceraNotas[1].id,nota:08,descripcion:'SEGUNDO EXAMEN',fecha:fecha1});
           notas2.push({idNotaCabecera:CURSO3.cabeceraNotas[2].id,nota:11,descripcion:'TERCER EXAMEN',fecha:fecha2});

           var notas3=[];//CURSO01
           notas3.push({idNotaCabecera:CURSO1.cabeceraNotas[0].id,nota:14,descripcion:'PRIMER EXAMEN',fecha:fecha});
           notas3.push({idNotaCabecera:CURSO1.cabeceraNotas[1].id,nota:16,descripcion:'SEGUNDO EXAMEN',fecha:fecha1});
           notas3.push({idNotaCabecera:CURSO1.cabeceraNotas[2].id,nota:19,descripcion:'TERCER EXAMEN',fecha:fecha2});

			var notas4=[];//CURSO02
           notas4.push({idNotaCabecera:CURSO2.cabeceraNotas[0].id,nota:10,descripcion:'PRIMER EXAMEN',fecha:fecha});
           notas4.push({idNotaCabecera:CURSO2.cabeceraNotas[1].id,nota:08,descripcion:'SEGUNDO EXAMEN',fecha:fecha1});
           notas4.push({idNotaCabecera:CURSO2.cabeceraNotas[2].id,nota:07,descripcion:'TERCER EXAMEN',fecha:fecha2});

			var notas5=[];//CURSO03
           notas5.push({idNotaCabecera:CURSO3.cabeceraNotas[0].id,nota:15,descripcion:'PRIMER EXAMEN',fecha:fecha});
           notas5.push({idNotaCabecera:CURSO3.cabeceraNotas[1].id,nota:05,descripcion:'SEGUNDO EXAMEN',fecha:fecha1});
           notas5.push({idNotaCabecera:CURSO3.cabeceraNotas[2].id,nota:07,descripcion:'TERCER EXAMEN',fecha:fecha2});
           
          
           var asistencias=[];
           asistencias.push({asistencia:true,fecha:new Date(2015, 06, 17)});
           asistencias.push({asistencia:false,fecha:new Date(2015, 06, 18)});
           asistencias.push({asistencia:false,fecha:new Date(2015, 06, 19)});

		   var asistencias1=[];
           asistencias1.push({asistencia:true,fecha:new Date(2015, 07, 19)});
           asistencias1.push({asistencia:false,fecha:new Date(2015, 07, 20)});
           asistencias1.push({asistencia:false,fecha:new Date(2015, 07, 21)});

        	var alumno=new AlumnoDB();
        	alumno.nombres="OLLANTA";
           	alumno.apPaterno="HUMALA";
           	alumno.apMaterno="TASO";
           	alumno.cursos.push({idCurso:CURSO1.id,nombre:CURSO1.nombre,tipo:CURSO1.tipo,notas:notas,asistencias:asistencias});
           	alumno.cursos.push({idCurso:CURSO2.id,nombre:CURSO2.nombre,tipo:CURSO2.tipo,notas:notas1,asistencias:asistencias1});
           	alumno.cursos.push({idCurso:CURSO3.id,nombre:CURSO3.nombre,tipo:CURSO3.tipo,notas:notas2,asistencias:asistencias});

        	var alumno1=new AlumnoDB();
        	alumno1.nombres="ALEJANDRO";
           	alumno1.apPaterno="TOLEDO";
           	alumno1.apMaterno="MANRIQUE";
           	alumno1.cursos.push({idCurso:CURSO1.id,nombre:CURSO1.nombre,tipo:CURSO1.tipo,notas:notas3,asistencias:asistencias});
           	alumno1.cursos.push({idCurso:CURSO2.id,nombre:CURSO2.nombre,tipo:CURSO2.tipo,notas:notas4,asistencias:asistencias});
           	alumno1.cursos.push({idCurso:CURSO3.id,nombre:CURSO3.nombre,tipo:CURSO3.tipo,notas:notas5,asistencias:asistencias1});

           	ALUMNO=alumno;

            CURSO1.alumnos.push(alumno);
            CURSO1.alumnos.push(alumno1);

            CURSO2.alumnos.push(alumno);
            CURSO2.alumnos.push(alumno1);

            CURSO3.alumnos.push(alumno);
            CURSO3.alumnos.push(alumno1);

        	alumno.save(function(){
        		alumno1.save(function(){
              CURSO1.save(function(){
                  CURSO2.save(function(){
                      CURSO3.save(callback);
                  });  
              });
            });
        	});          
        },
        function(callback){

           	var profesor=new ProfesorDB();
           	profesor.nombres="EDWIN";
           	profesor.apPaterno="RAMOS";
           	profesor.apMaterno="VELASQUEZ";

           	profesor.cursos.push({idCurso:CURSO1.id,nombre:CURSO1.nombre,tipo:CURSO1.tipo});
           	profesor.cursos.push({idCurso:CURSO2.id,nombre:CURSO2.nombre,tipo:CURSO2.tipo});

			var profesor1=new ProfesorDB();
           	profesor1.nombres="EDWIN";
           	profesor1.apPaterno="ROQUE";
           	profesor1.apMaterno="TITO";

           	profesor1.cursos.push({idCurso:CURSO3.id,nombre:CURSO3.nombre,tipo:CURSO3.tipo});
      		
      		PROFESOR=profesor;

      		profesor.save(function(){
      			profesor1.save(callback);

      		});

        },
        function(callback){

					var login=new LoginDB();
					login.usuario="jumanor";
					login.contrasenia="jumanor";	
					login.perfil="Alumno";
					login.persona=ALUMNO.id;
					
			        var login1=new LoginDB();
				    login1.usuario="jumanor1";
					login1.contrasenia="jumanor1";
					login1.perfil="Profesor";
					login1.persona=PROFESOR.id;

					login.save(function(){

						login1.save(callback);
					});

        }
    ],
    // optional callback
    function(err, results){
       if(err){
            console.log("Hubo un error "+err);
        }
        else{
             console.log("Carga Finalizada");
        }
    });
	
}
