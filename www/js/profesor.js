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
        
        var index=$("#idCursosProfesor")[0].selectedIndex;
        var idCurso=$("#idCursosProfesor")[0].options[index].attributes[0].value;
            //Capturamos el Curso Seleccionado
        var curso=$("#idCursosProfesor")[0].options[index].value;

        if(opciones=="idEscogerProfesor_Asistencia"){//PRIMERA OPCION
            
            $("#idPageProfesor_Asistencias_Detalle_Titulo").html(curso);

            var param={};
            param.idProfesor=GLOBAL_USUARIO.getIdentificador();
            param.idCurso=idCurso;    
            UTILS.ajaxGeneric(param,"getDescripcionesDeCursoAsistenciaByIdProfesor",function(data){
                
                $("#idGoProfesor_Asistencia").click();    
                $("#DescripcionesAsistenciasDeCursoByIdProfesor").attr("idcurso",idCurso);
                $("#DescripcionesAsistenciasDeCursoByIdProfesor").empty();      
                for(var i=0;i<data.length;i++){
                    
                    $("#DescripcionesAsistenciasDeCursoByIdProfesor").append("<li><a href='#idProfesor_Asistencia_Detalle' idcurso="+idCurso+" idasistenciacabecera="+data[i].idAsistenciaCabecera+">"+data[i].descripcion+"</a></li>");

                }
            });
            
        }////////////////////////////////////////////////////////////////
        else if(opciones=="idEscogerProfesor_Notas"){//SEGUNDA OPCION
            
            $("#idPageProfesor_Notas_Detalle_Titulo").html(curso);

            var param={};
            param.idProfesor=GLOBAL_USUARIO.getIdentificador();
            param.idCurso=idCurso;    
            UTILS.ajaxGeneric(param,"getDescripcionesDeCursoByIdProfesor",function(data){
                
                $("#idGoProfesor_Notas").click();
                $("#DescripcionesDeCursoByIdProfesor").attr("idcurso",idCurso);
                $("#DescripcionesDeCursoByIdProfesor").empty();      
                for(var i=0;i<data.length;i++){
                    
                    $("#DescripcionesDeCursoByIdProfesor").append("<li><a href='#idProfesor_Notas_Detalle' idcurso="+idCurso+" idnotacabecera="+data[i].idNotaCabecera +">"+data[i].descripcion+"</a></li>");

                }
            });
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
    /**
     * Captura el evento al realizar click en la Lista de las Cabeceras de la Notas(Descripciones de la notas)
     * @param  {String} idnotacabecera 
     *     
     */
   my.onClickEscogerNotaCabeceraProfesor=function(idCurso,idNotaCabecera,descripcion){
       
       $("#idTituloExamen").text(descripcion);
       
        var param={};
        param.idCurso=idCurso; 
        param.idNotaCabecera=idNotaCabecera; 
       
        UTILS.ajaxGeneric(param,"getAlumnoDeDescripcionesDeCursoByIdCurso",function(data){

            $("#AlumnosDeCursoByIdProfesor").attr("idcurso",idCurso);
            $("#AlumnosDeCursoByIdProfesor").attr("idnotacabecera",idNotaCabecera);
            
            $("#AlumnosDeCursoByIdProfesor").empty();
                
                for(var i=0;i<data.length;i++){
                    
                    var dia=document.createElement("td");
                        dia.setAttribute("data-title","APELLIDOS");
                        dia.appendChild(document.createTextNode(data[i].apPaterno+" "+data[i].apMaterno));
                    var inicio=document.createElement("td");
                        inicio.setAttribute("data-title","NOMBRES");
                        inicio.appendChild(document.createTextNode(data[i].nombres));
                    
                    var input=document.createElement("input");
                        input.setAttribute("identificador",data[i].id);
                        input.setAttribute("type","text");
                        input.setAttribute("value",data[i].nota);
                        input.disabled=true;
                    
                    var fin=document.createElement("td");
                        fin.setAttribute("data-title","NOTA");
                        fin.appendChild(input);
                    
                    var fila=document.createElement("tr");
                        fila.appendChild(dia);
                        fila.appendChild(inicio);
                        fila.appendChild(fin);
                        
                    
                    $("#AlumnosDeCursoByIdProfesor").append(fila);
                }

        });
   	
   }///////////////////////////////////////////////////////////////////////////////// 
   my.onClickSaveNotasDeAlumno=function(){
        var n=$("#AlumnosDeCursoByIdProfesor input").length;
        var alumnos=[];
        for(var i=0;i<n;i++){
            var alumno={};
            alumno.id=$($("#AlumnosDeCursoByIdProfesor input")[i]).attr("identificador");
            //alumno.id=$("#AlumnosDeCursoByIdProfesor input")[i].attributes[0].value
            alumno.nota=$("#AlumnosDeCursoByIdProfesor input")[i].value;
            //alumno.nota=$($("#AlumnosDeCursoByIdProfesor input")[i]).attr("value")
            alumnos.push(alumno);
        }  
        var param={};
        param.idCurso= $("#AlumnosDeCursoByIdProfesor").attr("idcurso");
        param.idNotaCabecera=$("#AlumnosDeCursoByIdProfesor").attr("idnotacabecera");
        param.alumnos=alumnos;

        UTILS.ajaxGeneric(param,"saveAlumnoDeDescripcionesDeCursoByIdCurso",function(data){
            if(data.estado===1){
                UTILS.alert("GUARDAR","Se guardaron los registros");
                for(var i=0;i<n;i++){
                    $("#AlumnosDeCursoByIdProfesor input")[i].disabled=true;     
                }
                $("#saveNotasDeAlumno").attr("class","icon database");//DESMARCAMOS ICONO!!!
            }
        });
   }///////////////////////////////////////////////////////////////////////////////// 
   my.onClickEditNotasDeAlumno=function(){
       var n=$("#AlumnosDeCursoByIdProfesor input").length;
       for(var i=0;i<n;i++){
            $("#AlumnosDeCursoByIdProfesor input")[i].disabled=false;     
       }
       UTILS.alert("EDITAR","Puede editar los registros");
        //$("#editNotasDeAlumno").attr("class","icon tools");//DESMARCAMOS ICONO!!!
   }///////////////////////////////////////////////////////////////////////////////// 
   my.onClickAddTituloNotasDeAlumno=function(){
       UTILS.prompt("AGREGAR","Ingrese un titulo","",function(results){
            console.log(results);
           
            if(results.buttonIndex==1){
               
                var idCurso=$("#DescripcionesDeCursoByIdProfesor").attr("idcurso");
                var param={};
                param.idCurso=idCurso;
                param.descripcion=results.input1;
                
                UTILS.ajaxGeneric(param,"newDescripcionDeCursoByIdCurso",function(data){
                    $("#DescripcionesDeCursoByIdProfesor").append("<li><a href='#idProfesor_Notas_Detalle' idcurso="+idCurso+" idnotacabecera="+data.idNotaCabecera +">"+data.descripcion+"</a></li>");
                    
                    $("#addTituloNotasDeAlumno").attr("class","icon add");//DESMARCAMOS ICONO!!!
                });
                
            }
       })
   }///////////////////////////////////////////////////////////////////////////////// 
   //////////////////////////////////////////////////////////////////////////////////
   //////////////////////////////////////////////////////////////////////////////////
    /**
     * Captura el evento al realizar click en la Lista de las Cabeceras de la Asistencia(Descripciones de la asistencia)
     *  @param  {String} idCurso 
     *  @param  {String} idAsistenciaCabecera 
     *     
     */
   my.onClickEscogerAsistenciaCabeceraProfesor=function(idCurso,idAsistenciaCabecera,descripcion){
       
       $("#idTituloAsistencia").text(descripcion);
       
        var param={};
        param.idCurso=idCurso; 
        param.idAsistenciaCabecera=idAsistenciaCabecera; 
       
        UTILS.ajaxGeneric(param,"getAlumnoDeDescripcionesDeAsistenciaByIdProfesor",function(data){

            $("#AlumnosDeCursoAsistenciaByIdProfesor").attr("idcurso",idCurso);
            $("#AlumnosDeCursoAsistenciaByIdProfesor").attr("idasistenciacabecera",idAsistenciaCabecera);
            
            $("#AlumnosDeCursoAsistenciaByIdProfesor").empty();
                
                for(var i=0;i<data.length;i++){
                    
                    var dia=document.createElement("td");
                        dia.setAttribute("data-title","APELLIDOS");
                        dia.appendChild(document.createTextNode(data[i].apPaterno+" "+data[i].apMaterno));
                    var inicio=document.createElement("td");
                        inicio.setAttribute("data-title","NOMBRES");
                        inicio.appendChild(document.createTextNode(data[i].nombres));
                    
                    var input=document.createElement("input");
                        input.setAttribute("identificador",data[i].id);
                        input.setAttribute("type","checkbox");
                        input.setAttribute("id","check"+i);
                        input.disabled=true;
                        if(data[i].asistencia===true)
                            input.checked=true;
                        else
                            input.checked=false;
                    
                    var label=document.createElement("label");
                        label.setAttribute("for","check"+i);
                            
                    var fin=document.createElement("td");
                        fin.setAttribute("data-title","ASISTENCIA");
                        fin.appendChild(input);
                        fin.appendChild(label);
                    
                    var fila=document.createElement("tr");
                        fila.appendChild(dia);
                        fila.appendChild(inicio);
                        fila.appendChild(fin);
                        
                    
                    $("#AlumnosDeCursoAsistenciaByIdProfesor").append(fila);
                }

        });
   	
   }///////////////////////////////////////////////////////////////////////////////// 
   my.onClickSaveAsistenciasDeAlumno=function(){
        var n=$("#AlumnosDeCursoAsistenciaByIdProfesor input").length;
        var alumnos=[];
        for(var i=0;i<n;i++){
            var alumno={};
            alumno.id=$($("#AlumnosDeCursoAsistenciaByIdProfesor input")[i]).attr("identificador");
            alumno.asistencia=$("#AlumnosDeCursoAsistenciaByIdProfesor input")[i].checked;
            alumnos.push(alumno);
        }  
        var param={};
        param.idCurso= $("#AlumnosDeCursoAsistenciaByIdProfesor").attr("idcurso");
        param.idAsistenciaCabecera=$("#AlumnosDeCursoAsistenciaByIdProfesor").attr("idasistenciacabecera");
        param.alumnos=alumnos;

        UTILS.ajaxGeneric(param,"saveAlumnoDeDescripcionesDeCursoAsistenciaByIdCurso",function(data){
            if(data.estado===1){
                UTILS.alert("GUARDAR","Se guardaron los registros");
                for(var i=0;i<n;i++){
                    $("#AlumnosDeCursoAsistenciaByIdProfesor input")[i].disabled=true;     
                }
                $("#saveAsistenciasDeAlumno").attr("class","icon database");//DESMARCAMOS ICONO!!!
            }
        });
   }///////////////////////////////////////////////////////////////////////////////// 
   my.onClickEditAsistenciasDeAlumno=function(){
       var n=$("#AlumnosDeCursoAsistenciaByIdProfesor input").length;
       for(var i=0;i<n;i++){
            $("#AlumnosDeCursoAsistenciaByIdProfesor input")[i].disabled=false;     
       }
       UTILS.alert("EDITAR","Puede editar los registros");
        
   }///////////////////////////////////////////////////////////////////////////////// 
   my.onClickAddTituloAsistenciasDeAlumno=function(){
        var fecha=new Date();
        fecha=fecha.toISOString().split("T")[0];
        fecha=fecha.split("-");
        fecha=fecha[2]+"-"+fecha[1]+"-"+fecha[0];
       
       UTILS.prompt("AGREGAR","Ingrese una descripcion",fecha,function(results){
            if(results.buttonIndex==1){
               
                var idCurso=$("#DescripcionesAsistenciasDeCursoByIdProfesor").attr("idcurso");
                var param={};
                param.idCurso=idCurso;
                param.descripcion=results.input1;
                //param.descripcion="PRIMERO";
                
                UTILS.ajaxGeneric(param,"newDescripcionDeAsistenciaByIdCurso",function(data){
                
                    $("#DescripcionesAsistenciasDeCursoByIdProfesor").append("<li><a href='#idProfesor_Asistencia_Detalle' idcurso="+idCurso+" idasistenciacabecera="+data.idAsistenciaCabecera+">"+data.descripcion+"</a></li>");
                    
                    $("#addTituloAsistenciasDeAlumno").attr("class","icon add");//DESMARCAMOS ICONO!!!
                });
                
           }
       })
   }///////////////////////////////////////////////////////////////////////////////// 
	return my;
}());