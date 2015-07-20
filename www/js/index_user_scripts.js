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
    LOGIN.crearEnlaces();  
    ALUMNO.crearEnlaces(); 
    PROFESOR.crearEnlaces(); 
        /* button  #idLogin */
    $(document).on("click", "#idLogin", function(evt)
    {
        LOGIN.onClickLogin();
    }); 
     
        /* button  #idEscogerAlumno */
    $(document).on("click", "#idEscogerAlumno", function(evt)
    {
       ALUMNO.onClickEscogerAlumno();
    
    });
         /* button  #idEscogerProfesor */
    $(document).on("click", "#idEscogerProfesor", function(evt)
    {
        /* your code goes here */ 
       PROFESOR.onClickEscogerProfesor();
    });
    /* listitem  SEGUNDO EXAMEN */
    $(document).on("click", "#DescripcionesDeCursoByIdProfesor", function(evt)
    {
        PROFESOR.onClickEscogerNotaCabeceraProfesor($(evt.target).attr("idcurso"),$(evt.target).attr("idnotacabecera"));
    });
    
}  
document.addEventListener("app.Ready", register_event_handlers, false);
    
})();
