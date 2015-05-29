(function()
{
 "use strict";
 function register_event_handlers()
 {
     
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