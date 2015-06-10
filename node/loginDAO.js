var UsuarioDB=require('./modelosDB/usuario.js');
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

	UsuarioDB.find({usuario:usuario,contrasenia:contrasenia,perfil:perfil}, function(err,data){

			if (err){ 
					  console.error(err);
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
						    if(data.perfil=="Alumno"){
						    	identificador=1;

						    }
						    if(data.perfil=="Profesor"){
						    	identificador=2;
						    	
						    }
						    if(data.perfil=="Administrador"){
								identificador=3;
						    	
						    }

						    usuario.id=data._id;
						    usuario.usuario=data.usuario;

						    usuario.identificador=identificador;  	//ESTO ES SOLO TEMPORAL
		    				usuario.nombres="CARLOS";				//ESTO ES SOLO TEMPORAL
		    				usuario.apellidos="CENTENO CENTENO";	//ESTO ES SOLO TEMPORAL

				 	  		callback(usuario,null);
				 	}
			}
	});
}	