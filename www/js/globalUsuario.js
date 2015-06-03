var GLOBAL_USUARIO = (function () {
	var my = {}
    
    var ID=null;
    var USUARIO=null;
    var IDENTIFICADOR=null;
    
    my.setUsuario = function (usuario) {
		USUARIO=usuario;
	};
    my.setId=function(id){
        ID=id;
    };
    my.getId=function(){
        return ID;
    };
    my.setIdentificador=function(identificador){
        IDENTIFICADOR=identificador;
    };
    my.getIdentificador=function(){
        return IDENTIFICADOR;
    };
	return my;
}());