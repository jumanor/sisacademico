(function()
{
 "use strict";
 function register_event_handlers()
 {
     
         /* button  #idEscogerProfesor */
    $(document).on("click", "#idEscogerProfesor", function(evt)
    {
        /* your code goes here */ 
        var opciones=$("#idPageProfesor_GrupoOpciones :checked")[0].id;
        if(opciones=="idEscogerProfesor_Asistencia"){
            $("#idGoProfesor_Asistencia").click();
        }
        else if(opciones=="idEscogerProfesor_Notas"){
            $("#idGoProfesor_Notas").click();
        }
    });
     
 }
    
 document.addEventListener("app.Ready", register_event_handlers, false);
})();    