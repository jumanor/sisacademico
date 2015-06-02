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
        
        $.ajax({
            type:"POST",
            url:GLOBAL.URL()+"/getCursoByIdAlumno",
            data:"data="+JSON.stringify(param),
            dataType : 'text',
            success:function(data){
                var data=JSON.parse(data);
                if(data.status===1){
                    callback(data.data);
                }
                if(data.status===0){
                    UTILS.alert("ERROR DB:",data.message);           
                    console.log("ERROR DB:"+data.message);
                }
            },
            error:function(data){
                UTILS.alert("ERROR",data);
                console.log("ERROR:"+data);
            }
        });
        
    }/////////////////////////////////////////////////////////////////////////////////
    my.cargarCursosDeAlumno=function(idAlumno){
        
        getCursos(idAlumno,function(data){
            
            $("#idCursosAlumno").empty();
            for(var i=0;i<data.length;i++){
                
                $("#idCursosAlumno").append("<option>"+data[i].nombre+"</option>");            
            }
            
        });
        
    }/////////////////////////////////////////////////////////////////////////////////
	return my;
}());