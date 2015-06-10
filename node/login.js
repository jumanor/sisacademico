var LOGIN_DAO=require('./loginDAO.js');
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
module.exports.getLogin=function(app){

	app.post('/getLogin', function(req, res){	
		
	    var data=req.param('data');
	    data=JSON.parse(data);
	    //console.log(data);	
	    
	    LOGIN_DAO.getLogin(data.usuario,data.contrasenia,data.perfil,function(respuesta,mensaje){

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

};////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
