var LOGIN = (function () {
	var my = {}
    
    /////////////////////////////////////////////////////////////////////////////////////
    /**
    *   Nos permite logearnos en el sistema
    *
    *   @param {String} usuario
    *   @param {String} contrasenia
    *   @param {String} perfil
    *   @param {Function} callback
    */
    function Login(usuario,contrasenia,perfil,callback){
        
        var param={};
        param.usuario=usuario;
        param.contrasenia=contrasenia;
        param.perfil=perfil;
        
        UTILS.ajaxGenericStatus(param,"getLogin",callback);
    
    }
    /////////////////////////////////////////////////////////////////////////////////////
    /**
    *	Crea enlaces para poder navegar a traves de las Vistas
    *	cuando el Logeo a sido satisfactorio
	* 
    */
    my.crearEnlaces=function(){
      //Enlaces Page Login
        $("body").append('<a id="idGoAlumno" href="#idPageAlumno"  class="style-31"></a>');
        $("body").append('<a id="idGoProfesor" href="#idPageProfesor"  class="style-31"></a>');
        
    };//////////////////////////////////////////////////////////////////////////////////
	/**
	 * Evento onClickLogin
	 *
	 * 
	 */
	my.onClickLogin= function () {
		
         /* your code goes here */
        
        var usuario=$("#idUsuario").val();
        var contrasenia=$("#idContrasenia").val();
        var perfil=$("#idPerfil").val();
        
        Login(usuario,contrasenia,perfil,function(data){
            
                console.log(data.status);
                
                if(data.status===1){
                    
                        GLOBAL_USUARIO.setId(data.data.id);
                        GLOBAL_USUARIO.setUsuario(data.data.usuario);
                        GLOBAL_USUARIO.setIdentificador(data.data.identificador);
                    
                        if(perfil=="Alumno"){
                            $("#idGoAlumno").click();
                            ALUMNO.cargarCursosDeAlumno(GLOBAL_USUARIO.getIdentificador());
                        }
                        else if(perfil=="Profesor"){
                            $("#idGoProfesor").click();
                            PROFESOR.cargarCursosDeProfesor(GLOBAL_USUARIO.getIdentificador());
                        }
                        else if(perfil=="Administrador"){

                        }
                    
                }
                if(data.status===0){
                    
                     navigator.notification.alert(
                        data.message,  // message
                        function(){},         // callback
                        'Mensaje',            // title
                        'Aceptar'                  // buttonName
                    );
                    
                }    
        
        });
        
       
	};/////////////////////////////////////////////////////////////////////////////////

	return my;
}());