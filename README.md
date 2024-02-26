# ST0263-5886

# Samuel Palacio Jimenez, spalacioj@eafit.edu.co

# P2P - Comunicación entre procesos mediante API REST, RPC y MOM
## 1. Descripcion de la actividad
desarrollo de un sistema P2P donde cada nodo / proceso contiene uno o más microservicios que soportan un sistema de compartición de archivos distribuido y descentralizado.
## 1.1 Que aspectos cumplió o desarrolló de la actividad propuesta por el profesor (requerimientos funcionales y no funcionales)

## 1.2. Que aspectos NO cumplió o desarrolló de la actividad propuesta por el profesor (requerimientos funcionales y no funcionales)

## 2. información general de diseño de alto nivel, arquitectura, patrones, mejores prácticas utilizadas.
El tipo de arquitectura que se usará es P2P no estructurada basada en servidor de directorio y localización. Primero, porque al no ser estructurada, todos los nodos son iguales, es decir, que no hay un servidor central que genere cuello de botella, también ayuda a que sea más escalable la aplicación. Además, el uso de un servidor de directorio y localización ayuda a que cuando un cliente necesite un servicio, pueda saber a qué otro cliente debe contactar para conseguir el servicio.

## 3. Descripción del ambiente de desarrollo y técnico

## 4. Descripción del ambiente de EJECUCIÓN (en producción)

# referencias
## https://www.youtube.com/watch?v=psYAhc9JUyo
## https://blog.logrocket.com/communicating-between-node-js-microservices-with-grpc/
## https://grpc.io/
