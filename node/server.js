var IPADDRESS="192.168.56.1";
var PORT=9095
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sisacademico');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
   
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
ALUMNO.getNotasDeCursoByIdAlumno(app);
ALUMNO.getAsistenciasDeCursoByIdAlumno(app);
PROFESOR.getCursoByIdProfesor(app);

PROFESOR.getDescripcionesDeCursoByIdProfesor(app);
PROFESOR.getAlumnoDeDescripcionesDeCursoByIdCurso(app);
PROFESOR.saveAlumnoDeDescripcionesDeCursoByIdCurso(app);
PROFESOR.newDescripcionDeCursoByIdCurso(app);

PROFESOR.getDescripcionesDeCursoAsistenciaByIdProfesor(app);
PROFESOR.getAlumnoDeDescripcionesDeAsistenciaByIdProfesor(app);
PROFESOR.saveAlumnoDeDescripcionesDeCursoAsistenciaByIdCurso(app);
PROFESOR.newDescripcionDeAsistenciaByIdCurso(app);


