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
        
            //<option idcurso="2">PROGRAMACION</option>
            //Capturamos el valor de idcurso    
            var index=$("#idCursosAlumno")[0].selectedIndex;
            var idCurso=$("#idCursosAlumno")[0].options[index].attributes[0].value;
            //Capturamos el Curso Seleccionado
            var curso=$("#idCursosAlumno")[0].options[index].value;
            
        
        if(opciones=="idEscogerAlumno_Notas"){
            $("#idGoAlumno_Notas").click();
            $("#idPageAlumno_Notas_Titulo").html(curso);
            
            
            var param={};
            param.idAlumno=GLOBAL_USUARIO.getIdentificador();
            param.idCurso=idCurso;    
            UTILS.ajaxGeneric(param,"getNotasDeCursoByIdAlumno",function(data){
                
                $("#NotasDeCursoByIdAlumno").empty();
                
                for(var i=0;i<data.length;i++){
                    
                    var dia=document.createElement("td");
                        dia.setAttribute("data-title","NOTA");
                        dia.appendChild(document.createTextNode(data[i].nota));
                    var inicio=document.createElement("td");
                        inicio.setAttribute("data-title","FECHA");
                        inicio.appendChild(document.createTextNode(data[i].fecha.split("T")[0]));
                    var fin=document.createElement("td");
                        fin.setAttribute("data-title","TIPO");
                        fin.appendChild(document.createTextNode(data[i].tipo));
                    var aula=document.createElement("td");
                        aula.setAttribute("data-title","COMENTARIO");
                        aula.appendChild(document.createTextNode(data[i].comentario));
                    
                    var fila=document.createElement("tr");
                        fila.appendChild(dia);
                        fila.appendChild(inicio);
                        fila.appendChild(fin);
                        fila.appendChild(aula);
                    
                    $("#NotasDeCursoByIdAlumno").append(fila);
                }
            
            });
            
        }
        else if(opciones=="idEscogerAlumno_Horario"){
            $("#idGoAlumno_Horario").click();
            $("#idPageAlumno_Horario_Titulo").html(curso);
            
            var param={};
            param.idAlumno=GLOBAL_USUARIO.getIdentificador();
            param.idCurso=idCurso;    
            UTILS.ajaxGeneric(param,"getHorariosDeCursoByIdAlumno",function(data){
                
                $("#HorariosDeCursoByIdAlumno").empty();
                
                for(var i=0;i<data.length;i++){
                    
                    var dia=document.createElement("td");
                        dia.setAttribute("data-title","DIA");
                        dia.appendChild(document.createTextNode(data[i].dia));
                    var inicio=document.createElement("td");
                        inicio.setAttribute("data-title","INICIO");
                        inicio.appendChild(document.createTextNode(data[i].inicio));
                    var fin=document.createElement("td");
                        fin.setAttribute("data-title","FIN");
                        fin.appendChild(document.createTextNode(data[i].fin));
                    var aula=document.createElement("td");
                        aula.setAttribute("data-title","AULA");
                        aula.appendChild(document.createTextNode(data[i].aula));
                    var tipo=document.createElement("td");
                        tipo.setAttribute("data-title","TIPO");
                        tipo.appendChild(document.createTextNode(data[i].tipo));

                    var fila=document.createElement("tr");
                        fila.appendChild(dia);
                        fila.appendChild(inicio);
                        fila.appendChild(fin);
                        fila.appendChild(aula);
                        fila.appendChild(tipo);
                    
                    $("#HorariosDeCursoByIdAlumno").append(fila);
                }
                
                
            });
            
        }
        else if(opciones=="idEscogerAlumno_Asistencia"){
            $("#idGoAlumno_Asistencia").click();
            $("#idPageAlumno_Asistencias_Titulo").html(curso);
            
            
            var param={};
            param.idAlumno=GLOBAL_USUARIO.getIdentificador();
            param.idCurso=idCurso;    
            UTILS.ajaxGeneric(param,"getAsistenciasDeCursoByIdAlumno",function(data){
                
                $("#AsistenciasDeCursoByIdAlumno").empty();
                
                for(var i=0;i<data.length;i++){
                    
                    var dia=document.createElement("td");
                        dia.setAttribute("data-title","ESTADO");
                        var tmp="";
                        if(data[i].estado===true){
                            tmp="ASISTIO";
                        }
                        else{
                            tmp="FALTO";
                        }
                        dia.appendChild(document.createTextNode(tmp));
                    var inicio=document.createElement("td");
                        inicio.setAttribute("data-title","FECHA");
                        inicio.appendChild(document.createTextNode(data[i].fecha.split("T")[0]));
                    var aula=document.createElement("td");
                        aula.setAttribute("data-title","COMENTARIO");
                        aula.appendChild(document.createTextNode(data[i].comentario));
                    
                    var fila=document.createElement("tr");
                        fila.appendChild(dia);
                        fila.appendChild(inicio);
                        fila.appendChild(aula);
                    
                    $("#AsistenciasDeCursoByIdAlumno").append(fila);
                }
            
            });
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
