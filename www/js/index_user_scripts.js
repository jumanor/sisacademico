(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
     //Cambiamos de nombre del boton atras
     $(".button.backButton").html("ATRAS");//$.ui.popup('Hi there');
     //Enlaces Page Login
    $("body").append('<a id="idGoAlumno" href="#idPageAlumno"  class="style-31"></a>');
    $("body").append('<a id="idGoProfesor" href="#idPageProfesor"  class="style-31"></a>');  
     //Enlaces Page Alumno
     $("body").append('<a id="idGoAlumno_Notas" href="#idPageAlumno_Notas"  class="style-31"></a>');  
     $("body").append('<a id="idGoAlumno_Horario" href="#idPageAlumno_Horario"  class="style-31"></a>');  
     $("body").append('<a id="idGoAlumno_Asistencia" href="#idPageAlumno_Asistencia"  class="style-31"></a>');  
     //Enlaces Page Profesor
     $("body").append('<a id="idGoProfesor_Asistencia" href="#idPageProfesor_Asistencia"  class="style-31"></a>');  
     $("body").append('<a id="idGoProfesor_Notas" href="#idPageProfesor_Notas"  class="style-31"></a>');  
  
 
        /* button  #idLogin */
    $(document).on("click", "#idLogin", function(evt)
    {
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
        
    }); 
    
    
    }
    
document.addEventListener("app.Ready", register_event_handlers, false);
    
})();
