# SQL Intermedio
Este repositorio contiene todos los scripts SQL utilizados en la aplicación SQL Intermedio. Autor: Byron Cuesta Quintero. Grupo de Investigación en Pensamiento Computacional - GIPCO. Universidad Francisco de Paula Santander Ocaña.

## Configuración
Copie el código que se encuentra dentro de los archivos ".sql" ubicados en las carpetas, péguelo en una Query tool de PgAdmin de Postgres. Estos archivos contienen el código necesario para crear y poblar el esquema y las tablas utilizadas en la aplicación SQL Intermedio.

![Esquema Supermercado](url completa de la imagen)

## Versión web

La carpeta [`web/`](web/) contiene una versión web de la aplicación SQL Intermedio, para usarla desde cualquier celular (Android o iPhone) o computador con un navegador. Incluye el mismo contenido de la app y permite ejecutar las consultas sobre una base de datos PostgreSQL que corre en el navegador, cargada con los esquemas de estos scripts.

Se publica automáticamente en GitHub Pages con el workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). Ver [`web/README.md`](web/README.md) para más detalles.
