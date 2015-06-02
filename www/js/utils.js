var UTILS = (function () {
	var my = {}
    
	my.alert = function (titulo,mensaje) {
		
        navigator.notification.alert(
                        mensaje,  // message
                        function(){},         // callback
                        titulo,            // title
                        'Aceptar'                  // buttonName
                    );
	};

	return my;
}());