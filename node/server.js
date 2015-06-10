var IPADDRESS="192.168.56.1";
var PORT=9095
var express = require('express');
var bodyParser = require('body-parser');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type,x-access-token');
   
    next();
}

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);

var server = app.listen(PORT,IPADDRESS);
console.log('Escuchando en '+IPADDRESS+':'+PORT);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
var LOGIN=require('./login.js');
var ALUMNO=require('./alumno.js');
var PROFESOR=require('./profesor.js');
///////////////////////////////////////////////////////////////////////////////////////////////////////////
LOGIN.getLogin(app);
ALUMNO.getCursoByIdAlumno(app);
ALUMNO.getHorariosDeCursoByIdAlumno(app);
PROFESOR.getCursoByIdProfesor(app);
