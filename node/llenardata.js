var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sisacademico',function(){
    
    mongoose.connection.db.dropDatabase(function(err,result){
	if(err)console.log(err);
	else{
	   cargarData();	
	}
   });
});

///////////////////////////////////////////////////////////////////////////////////////
var UsuarioDB=require('./modelosDB/usuario.js');

function cargarData(){
	console.log("Iniciando Carga");

	var tmp=new UsuarioDB();
	tmp.usuario="jumanor";
	tmp.contrasenia="jumanor";
	tmp.perfil="Alumno";

	tmp.save(function(err){
		if(err)console.log(err);
		console.log("OK");
	});

	var tmp=new UsuarioDB();
	tmp.usuario="jumanor";
	tmp.contrasenia="jumanor";
	tmp.perfil="Profesor";

	tmp.save(function(err){
		if(err)console.log(err);
		console.log("OK");
	});

	var tmp=new UsuarioDB();
	tmp.usuario="jumanor";
	tmp.contrasenia="jumanor";
	tmp.perfil="Administrador";

	tmp.save(function(err){
		if(err)console.log(err);
		console.log("OK");
	});

	
}
