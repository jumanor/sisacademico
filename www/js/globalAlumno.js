var GLOBAL_ALUMNO = (function () {
	var my = {}
    
    var ID=null;
    var USUARIO=null;
    var ID_ALUMNO=null;
    
    my.setUsuario = function (usuario) {
		USUARIO=usuario;
	};
    my.setId=function(id){
        ID=id;
    };
    my.getId=function(){
        return ID;
    };
    my.setIdAlumno=function(id){
        ID_ALUMNO=id;
    };
    my.getIdAlumno=function(){
        return ID_ALUMNO;
    };
	return my;
}());