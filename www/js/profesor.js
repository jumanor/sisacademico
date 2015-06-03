 var PROFESOR = (function () {
	var my = {}
    /////////////////////////////////////////////////////////////////////////////////
    my.crearEnlaces=function(){
      //Enlaces Page Profesor
     $("body").append('<a id="idGoProfesor_Asistencia" href="#idPageProfesor_Asistencia"  class="style-31"></a>');  
     $("body").append('<a id="idGoProfesor_Notas" href="#idPageProfesor_Notas"  class="style-31"></a>');  
    };///////////////////////////////////////////////////////////////////////////////
	my.onClickEscogerProfesor = function () {
		 /* your code goes here */
        var opciones=$("#idPageProfesor_GrupoOpciones :checked")[0].id;
        if(opciones=="idEscogerProfesor_Asistencia"){
            $("#idGoProfesor_Asistencia").click();
        }
        else if(opciones=="idEscogerProfesor_Notas"){
            $("#idGoProfesor_Notas").click();
        }
	};///////////////////////////////////////////////////////////////////////////////
  my.cargarCursosDeProfesor=function(idProfesor){
        
        var param={};
        param.idProfesor=idProfesor;    
        UTILS.ajaxGeneric(param,"getCursoByIdProfesor",function(data){

          $("#idCursosProfesor").empty();
            for(var i=0;i<data.length;i++){
                
                $("#idCursosProfesor").append("<option idcurso="+data[i].id+">"+data[i].nombre+"</option>");            
            }

        });
        
    }/////////////////////////////////////////////////////////////////////////////////
	return my;
}());