var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sisacademico');

var UsuarioDB=require('./modelosDB/usuario.js');
UsuarioDB.find({usuario: 'jumanor',contrasenia:'jumanor'}, function(err,data){

	if (err) return console.error(err);
  	console.log(data);

});