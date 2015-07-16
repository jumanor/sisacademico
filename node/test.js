var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sisacademico');

var Login=require('./modelosDB/login.js');
var Alumno=require('./modelosDB/alumno.js');

var login=new Login({usuario:'jumanor',contrasenia:'jumanor'});
var alumno=new Alumno({nombres:'jorge david'});
login.persona=alumno;

/*
login.save(function(err,data){

	alumno.save(function(err,data){

		console.log("ok");
	});

});
*/
Login.find().populate("persona").exec(function(err,data){

	 Alumno.find(data.id).exec(function(err,data){

	 	console.log(data);
	 });
});