SISACADEMICO
=====================================================================
Este aplicativo se realiza para probar INTEL XDK (APP FRAMEWORK) + PHONEGAP

**INSTALACIÓN CLIENTE**
* Descargue el Proyecto
* En el IDE Intel XDK ejecute "OPEN AN INTEL XDK PROYECT" y abra el archivo "ProyectoFinal.xdk"
* Para visualizar el diseñador del proyecto dirijase a "www/index.html"
* Los codigos de los eventos se encuentran en "www/js/index_user_scripts.js"
* Ir a "www/js/global.js" y configurar adecuademente las variables IPADDRESS y PORT, de acuerdo a como se configuro el Servidor Node.

**INSTALACIÓN SERVIDOR**
* El Servidor Node esta configurado para realizar CROSSDOMAIN.
* Ir a la carpeta "node" y ejecutar "npm install" (para descargar los modulos necesarios)
* Ir a "server.js" y configurar adecuademente las variables IPADDRESS y PORT
* Ejecutar "node server.js"

**INSTALACIÓN BASE DE DATOS**
* Instale MongoDB
* Ir a la carpeta "node" y ejecutar "node llenardata.js" (para llenar la BD con data de prueba)

**OBSERVACIÓN**
* La api "navigator.notification.prompt" de PHONEGAP no es emulado (EMULATE) por INTEL XDK, tendra que usar depuracion (DEBUG) para ver el correcto funcionamiento
* Instalar Genymotion https://www.genymotion.com/

