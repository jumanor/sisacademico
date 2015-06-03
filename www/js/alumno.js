var ALUMNO = (function () {
	var my = {}
    /////////////////////////////////////////////////////////////////////////////////////
    my.crearEnlaces=function(){
        //Enlaces Page Alumno
     $("body").append('<a id="idGoAlumno_Notas" href="#idPageAlumno_Notas"  class="style-31"></a>');  
     $("body").append('<a id="idGoAlumno_Horario" href="#idPageAlumno_Horario"  class="style-31"></a>');  
     $("body").append('<a id="idGoAlumno_Asistencia" href="#idPageAlumno_Asistencia"  class="style-31"></a>');  
    };//////////////////////////////////////////////////////////////////////////////////
	my.onClickEscogerAlumno = function () {
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
	};/////////////////////////////////////////////////////////////////////////////////
    /**
    *   Nos permite capturar los Cursos del Alumno
    *
    *   @param {Number} idAlumno
    *
    *   @return {Array} {Number} id  	    identificador del curso
    *                   {String} nombre 	nombre del curso        
    */
    function getCursos(idAlumno,callback){
        
        var param={};
        param.idAlumno=idAlumno;    
        UTILS.ajaxGeneric(param,"getCursoByIdAlumno",callback);
        
    }/////////////////////////////////////////////////////////////////////////////////
    my.cargarCursosDeAlumno=function(idAlumno){
        
        getCursos(idAlumno,function(data){
            
            $("#idCursosAlumno").empty();
            for(var i=0;i<data.length;i++){
                
                $("#idCursosAlumno").append("<option idcurso="+data[i].id+">"+data[i].nombre+"</option>");            
            }
            
        });
        
    }/////////////////////////////////////////////////////////////////////////////////
	return my;
}());