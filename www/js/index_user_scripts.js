(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
     //Cargamos eventos para poder realizar las transiciones de las Vistas
    $("body").append('<a id="idGoAlumno" href="#idPageAlumno"  class="style-31"></a>');
    $("body").append('<a id="idGoProfesor" href="#idPageProfesor"  class="style-31"></a>');  
     $("body").append('<a id="idGoAlumno_Notas" href="#idPageAlumno_Notas"  class="style-31"></a>');  
     $("body").append('<a id="idGoAlumno_Horario" href="#idPageAlumno_Horario"  class="style-31"></a>');  
     $("body").append('<a id="idGoAlumno_Asistencia" href="#idPageAlumno_Asistencia"  class="style-31"></a>');  
 
 
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
     
         
    /* button  #idEscogerAlumno */
    $(document).on("click", "#idEscogerAlumno", function(evt)
    {
        /* your code goes here */
        var opciones=$("#idPageAlumno_GrupoOpciones :checked")[0].id;
        if(opciones=="idEscogerAlumno_Notas"){
            $("#idGoAlumno_Notas").click();
        }
        else if(opciones=="idEscogerAlumno_Horario"){
            $("#idGoAlumno_Horario").click();
        }
        else if(opciones=="idEscogerAlumno_Asistencia"){
            $("#idGoAlumno_Asistencia").click();
        }
    
    });
    
    }
    
document.addEventListener("app.Ready", register_event_handlers, false);
    
})();
