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

	var user={}
    	user.id=1;
    	user.usuario='jumanor';

	var msn={};
	msn.data=user;	
	msn.status=1;
	msn.message=null;
	
   }				
	        
   res.json(msn);
	
});
app.post('/getAlumnos', function(req, res){	

    	var data=req.param('data');
	data=JSON.parse(data);    	

	//console.log(data);

	var ciclo=null;	
	
	if(data.ciclo=="I"){
	  ciclo="I";
	}
	else if(data.ciclo=="II"){
	  ciclo="II";
	}	
	
    	var user={}
    	user.id=1;
    	user.usuario='jumanor1';
	user.ciclo=ciclo;
    
	var user1={}
    	user1.id=2;
    	user1.usuario='jumanor2';
	user1.ciclo=ciclo;
    
	var users=[];
	users[0]=user;
	users[1]=user1;

	var msn={};
	msn.data=users;	
	msn.status=1;
	msn.message=null;
	
	res.json(msn);
	
});
