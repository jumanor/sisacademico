var UTILS = (function () {
	var my = {}
    ////////////////////////////////////////////////////////////////////////////
	my.alert = function (titulo,mensaje) {
		
        navigator.notification.alert(
                        mensaje,  // message
                        function(){},         // callback
                        titulo,            // title
                        'Aceptar'                  // buttonName
                    );
	};///////////////////////////////////////////////////////////////////////////
    my.confirm=function(titulo,mensaje,onConfirm){
        navigator.notification.confirm(
            mensaje, // message
            onConfirm,            // callback to invoke with index of button pressed
            titulo,           // title
            ['Aceptar','Cancelar']     // buttonLabels
        );
    };///////////////////////////////////////////////////////////////////////////
    my.prompt=function(titulo,mensaje,defecto,onPrompt){
        
        navigator.notification.prompt(
            mensaje,  // message
            onPrompt,                  // callback to invoke
            titulo,            // title
            ['Aceptar','Cancelar'],
            defecto
        );
    };///////////////////////////////////////////////////////////////////////////
    my.ajaxGeneric=function(param,uri,callback){
        var mostrar=true;
        var popup=null;
        if(mostrar===true){popup=UTILS.popup("Procesando...");}
        
        $.ajax({
            type:"POST",
            url:GLOBAL.URL()+"/"+uri,
            data:"data="+JSON.stringify(param),
            dataType : 'text',
            success:function(data){
                var data=JSON.parse(data);
                if(data.status===1){
                    if(popup!=null)popup.hide();
                    callback(data.data);
                }
                if(data.status===0){
                    UTILS.alert("ERROR DB:",data.message.codigo+"::"+data.message.message);           
                    console.log("ERROR DB:"+data.message.codigo+"::"+data.message.message);
                }
            },
            error:function(data){
                UTILS.alert("ERROR",data);
                console.log("ERROR:"+data);
            }
        });
    
    };///////////////////////////////////////////////////////////////////////////
    my.ajaxGenericStatus=function(param,uri,callback){
        
        $.ajax({
            type:"POST",
            url:GLOBAL.URL()+"/"+uri,
            data:"data="+JSON.stringify(param),
            dataType : 'text',
            success:function(data){
                var data=JSON.parse(data);
                callback(data);
            },
            error:function(data){
                UTILS.alert("ERROR",data);
                console.log("ERROR:"+data);
            }
        });
    
    };///////////////////////////////////////////////////////////////////////////
    my.popup=function(msn){
        var popup= $.ui.popup({title:msn,cancelOnly:true,cancelClass:"buttonPopUp"});
        return popup;
    };///////////////////////////////////////////////////////////////////////////
	return my;
}());