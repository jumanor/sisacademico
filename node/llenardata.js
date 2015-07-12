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
var UsuarioDB=require('./modelosDB/usuario.js');

function cargarData(){
	console.log("Iniciando Carga");
    async.parallel([
        function(callback){
           
            var tmp=new UsuarioDB();
            tmp.usuario="jumanor";
            tmp.contrasenia="jumanor";
            tmp.perfil="Alumno";

            tmp.save(function(err){
                if(err)console.log(err);
                console.log("OK "+tmp.id);
                callback(null,null);
            });
            
        },
        function(callback){
           
            var tmp=new UsuarioDB();
            tmp.usuario="jumanor";
            tmp.contrasenia="jumanor";
            tmp.perfil="Profesor";

            tmp.save(function(err){
                if(err)console.log(err);
                console.log("OK "+tmp.id);
                callback(null,null);
            });
            
        },
        function(callback){
            
            var tmp=new UsuarioDB();
            tmp.usuario="jumanor";
            tmp.contrasenia="jumanor";
            tmp.perfil="Administrador";

            tmp.save(function(err){
                if(err)console.log(err);
                console.log("OK "+tmp.id);
                callback(null,null);
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
