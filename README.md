# ST0263-5886

# Samuel Palacio Jimenez, spalacioj@eafit.edu.co

# P2P - Comunicación entre procesos mediante API REST, RPC y MOM
## 1. Descripcion de la actividad
desarrollo de un sistema P2P donde cada nodo / proceso contiene uno o más microservicios que soportan un sistema de compartición de archivos distribuido y descentralizado.
## 1.1 Que aspectos cumplió o desarrolló de la actividad propuesta por el profesor (requerimientos funcionales y no funcionales)
Se desarrollo la funcionalidad principal del reto y se hizo el test de manera local tambien se hizo uso de los dos middlewares propuestos por el profesor

## 1.2. Que aspectos NO cumplió o desarrolló de la actividad propuesta por el profesor (requerimientos funcionales y no funcionales)
No se logro hacer pruebas con aws debido a problemas con la cuenta de aws academy

## 2. información general de diseño de alto nivel, arquitectura, patrones, mejores prácticas utilizadas.
El tipo de arquitectura que se usará es P2P no estructurada basada en servidor de directorio y localización. Primero, porque al no ser estructurada, todos los nodos son iguales, es decir, que no hay un servidor central que genere cuello de botella, también ayuda a que sea más escalable la aplicación. Además, el uso de un servidor de directorio y localización ayuda a que cuando un cliente necesite un servicio, pueda saber a qué otro cliente debe contactar para conseguir el servicio.

## 3. Descripción del ambiente de desarrollo y técnico
primero se debe usar el comando  
```npm install```  
con este se instalaran las librerias necesarias para que funcione correctamente la aplicacion  
luego debemos configurar en el archivo .env el puerto en donde vamos a ejecutar el servicio grpc y en el archivo pclient el puerto que se usara para el rest api (no usar el puerto 3000 que se usa en el servidor de directorios y localizacion)  
para ejecutar el proyecto tenemos dos comandos:   
```npm run start-all```  
con este ejecutamos un peer mas el servidor de directorios y,  
```npm run start-peer```  
con este solo corremos el pserver y pclient, es decir un peer

## 4. Descripción del ambiente de EJECUCIÓN (en producción)
para este reto no se desplego en produccion por problemas con los creditos en la cuenta de aws
# referencias
## https://www.youtube.com/watch?v=psYAhc9JUyo
## https://blog.logrocket.com/communicating-between-node-js-microservices-with-grpc/
## https://grpc.io/
