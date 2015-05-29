var LOGIN = (function () {
	var my = {}
    /////////////////////////////////////////////////////////////////////////////////////
    my.crearEnlaces=function(){
      //Enlaces Page Login
        $("body").append('<a id="idGoAlumno" href="#idPageAlumno"  class="style-31"></a>');
        $("body").append('<a id="idGoProfesor" href="#idPageProfesor"  class="style-31"></a>');
        
    };//////////////////////////////////////////////////////////////////////////////////
	my.onClickLogin= function () {
		
         /* your code goes here */
        var perfil=$("#idPerfil").val();
        
        console.log(perfil);
        
        if(perfil=="Alumno"){
            $("#idGoAlumno").click();
        }
        else if(perfil=="Profesor"){
            $("#idGoProfesor").click();
        }
        else if(perfil=="Administrador"){
            
        }
	};/////////////////////////////////////////////////////////////////////////////////

	return my;
}());