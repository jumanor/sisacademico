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
module.exports.getLogin=function(app){

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
			
	});

};////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	