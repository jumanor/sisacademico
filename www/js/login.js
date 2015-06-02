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
        
        $.ajax({
            type:"POST",
            url:GLOBAL.URL()+"/getLogin",
            data:"data="+JSON.stringify(param),
            //dataType : 'json',
            dataType : 'text',
            success:callback,
            error:function(data){
            
                console.log("ERROR:"+data);
            }
        });
        
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
        
                var data=JSON.parse(data);
            
                console.log(data.status);
                
                if(data.status===1){
                    
                        GLOBAL_ALUMNO.setId(data.data.id);
                        GLOBAL_ALUMNO.setUsuario(data.data.usuario);
                        GLOBAL_ALUMNO.setIdAlumno(data.data.idAlumno);
                    
                        if(perfil=="Alumno"){
                            $("#idGoAlumno").click();
                            ALUMNO.cargarCursosDeAlumno(GLOBAL_ALUMNO.getIdAlumno());
                        }
                        else if(perfil=="Profesor"){
                            $("#idGoProfesor").click();
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