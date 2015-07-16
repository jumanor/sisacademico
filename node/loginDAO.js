var LoginDB=require('./modelosDB/login.js');
var AlumnoDB=require('./modelosDB/alumno.js');
var ProfesorDB=require('./modelosDB/profesor.js');
/**
 * Metodo para autenticarse en el sistema
 * 
 * @param  {String} data.usuario      
 * @param  {String} data.contrasenia
 * @param  {String} data.perfil
 * 
 * @return {Object} {Number} id 				identificador de usuario
 *                  {String} usuario 			nombre de usuario
 *                  {String} identificador 		identificador del alumno o profesor o administrador
 *                  {String} nombres 			nombres del alumno o profesor o administrador
 *                  {String} apellidos 			apellidos del alumno o profesor o administrador          
 */
module.exports.getLogin=function(usuario,contrasenia,perfil,callback){

	LoginDB.find({usuario:usuario,contrasenia:contrasenia,perfil:perfil}, function(err,data){

			if (err){ 
					  console.log(err);
				      callback(-1,err);
			}
			else{	
				 	if(data.length===0){//Usuario no encontrado

				 			callback(-2,"USUARIO NO AUTENTICADO");
				 	} 
				 	else{	//Usuario encontrado
				 			data=data[0];
				 			var usuario={};

				 			var identificador=null;
				 			var nombres=null;
				 			var apellidos=null;

				 			console.log(data);

						    if(data.perfil=="Alumno"){
						    	
								AlumnoDB.findById(data.persona).exec(function(err,alumno){
										if(err){
											console.log(err);
											return callback(-1,err);	
											
										}
										identificador=alumno.id;
										nombres=alumno.nombres;
										apellidos=alumno.apPaterno+" "+alumno.apMaterno;

								});
						    }
						    if(data.perfil=="Profesor"){

						    	ProfesorDB.findById(data.persona).exec(function(err,profesor){
										if(err){
											console.log(err);
											return callback(-1,err);	
											
										}
										identificador=profesor.id;
										nombres=profesor.nombres;
										apellidos=profesor.apPaterno+" "+profesor.apMaterno;

								});
						    }
						    

						    usuario.id=data.id;
						    usuario.usuario=data.usuario;

						    usuario.identificador=identificador;  
		    				usuario.nombres=nombres;		
		    				usuario.apellidos=apellidos;	

				 	  		callback(usuario,null);
				 	}
			}
	});
}	