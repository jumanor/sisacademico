var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sisacademico');

var Login=require('./modelosDB/login.js');
var Alumno=require('./modelosDB/alumno.js');
var Profesor=require('./modelosDB/profesor.js');
var Curso=require('./modelosDB/curso.js');

//var login=new Login({usuario:'jumanor',contrasenia:'jumanor'});
//var alumno=new Alumno({nombres:'jorge david'});

/*
login.save(function(err,data){

	alumno.save(function(err,data){

		console.log("ok");
	});

});
*/
/*
Login.find().populate("persona").exec(function(err,data){

	 Alumno.find(data.id).exec(function(err,data){

	 	console.log(data);
	 });
});
*/
Alumno.find().or([{_id:"55ab23e9bc1659a91be6e5b3"},{_id:"55ab23e9bc1659a91be6e5c9"}]).exec(function(err,data){
	if(err)console.log(err);

	

});
