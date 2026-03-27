# Sistema de Planilla basado en Microservicios
Sistema de gestión de planilla desarrollado para instituciones educativas, orientado a la automatización del cálculo de salarios para personal docente y administrativo.

El sistema permite registrar empleados, gestionar salarios base, calcular automáticamente el salario total, aplicar descuentos legales obligatorios (ISSS, AFP y Renta) y generar comprobantes de pago digitales.

La solución está construida bajo una arquitectura de microservicios utilizando Java y Spring Boot, lo que permite dividir el sistema en módulos independientes, facilitando su mantenimiento, escalabilidad y evolución.

## Proposito
Desarrollar un sistema transaccional que permita gestionar y automatizar los procesos relacionados con la planilla salarial, garantizando eficiencia, confiabilidad, seguridad y control administrativo en instituciones educativas.

## Arquitectura del sistema
El sistema está compuesto por los siguientes microservicios:

- Microservicio de Empleados
  Gestiona la información del personal, incluyendo registro, consulta, actualización y eliminación.

- Microservicio de Cálculo de Planilla
  Calcula el salario bruto y neto en función del salario base, horas trabajadas y bonificaciones.

- Microservicio de Descuentos
  Administra y aplica descuentos legales como ISSS, AFP y Renta.

- Microservicio de Reportes
  Genera comprobantes de pago y reportes administrativos en distintos formatos.

- Microservicio de Usuarios y Seguridad
  Gestiona la autenticación y autorización mediante control de roles y uso de tokens.

## Tecnologías utilizadas
- Java 17  
- Spring Boot  
- Spring Data JPA  
- MySQL o PostgreSQL  
- JWT para autenticación  
- Postman para pruebas de API  
- GitHub para control de versiones  
- Draw.io para diagramación  
- Trello para gestión de tareas  

## Funcionalidades principales
- Registro y gestión de empleados  
- Cálculo automático de salarios  
- Aplicación de descuentos legales  
- Generación de comprobantes de pago  
- Consulta de historial de planilla  
- Generación de reportes administrativos  

## Requisitos no funcionales
- Seguridad mediante almacenamiento encriptado de contraseñas y control de acceso por roles  
- Alta disponibilidad del sistema  
- Procesamiento eficiente de cálculos de planilla  
- Escalabilidad mediante arquitectura de microservicios  
- Facilidad de uso desde distintos dispositivos  

## Base de datos
El sistema utiliza un modelo relacional que incluye entidades como:
- Empleado  
- SalarioBase  
- HorasClase  
- Planilla  
- Descuento  
- PlanillaDescuento  
- Usuario  
- Rol  

## Equipo de desarrollo
- Gabriela Stephani Figueroa Calderón  
- Daniela Nicole García Guillén  
- Josué Ernesto Mena Colato  
