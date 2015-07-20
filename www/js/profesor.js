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

        if(opciones=="idEscogerProfesor_Asistencia"){
            $("#idGoProfesor_Asistencia").click();
        }
        else if(opciones=="idEscogerProfesor_Notas"){
            $("#idGoProfesor_Notas").click();
            $("#idPageProfesor_Notas_Detalle_Titulo").html(curso);

            var param={};
            param.idProfesor=GLOBAL_USUARIO.getIdentificador();
            param.idCurso=idCurso;    
            UTILS.ajaxGeneric(param,"getDescripcionesDeCursoByIdProfesor",function(data){
                
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
   my.onClickEscogerNotaCabeceraProfesor=function(idCurso,idNotaCabecera){
       
        var param={};
        param.idCurso=idCurso; 
        param.idNotaCabecera=idNotaCabecera; 
       
        UTILS.ajaxGeneric(param,"getAlumnoDeDescripcionesDeCursoByIdCurso",function(data){

            //console.log(data);//AlumnosDeCursoByIdProfesor
            $("#AlumnosDeCursoByIdProfesor").empty();
                
                for(var i=0;i<data.length;i++){
                    
                    var dia=document.createElement("td");
                        dia.setAttribute("data-title","APELLIDOS");
                        dia.appendChild(document.createTextNode(data[i].apPaterno+" "+data[i].apMaterno));
                    var inicio=document.createElement("td");
                        inicio.setAttribute("data-title","NOMBRES");
                        inicio.appendChild(document.createTextNode(data[i].nombres));
                    
                    var input=document.createElement("input");
                        input.setAttribute("type","text");
                        input.setAttribute("value",data[i].nota);
                    
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

	return my;
}());