# SQL Intermedio — versión web

Versión web de la aplicación Android **SQL Intermedio** (Byron Cuesta Quintero, UFPSO - GIPCO), para que se pueda usar desde cualquier celular (Android o iPhone) o computador con un navegador.

Incluye todo el contenido de la app: Joins, Funciones Agregadas, Subconsultas, los 11 ejercicios con su solución y la sección "Acerca de". Además, cada consulta se puede **ejecutar y modificar** sobre una base de datos PostgreSQL real que corre dentro del navegador ([PGlite](https://pglite.dev)), cargada con los mismos esquemas y datos de los scripts `.sql` de este repositorio.

## Desarrollo local

Requiere Node.js 20 o superior.

```bash
cd web
npm install
npm run dev       # servidor de desarrollo en http://localhost:5173
npm run build     # genera la versión de producción en web/dist
npm run preview   # sirve web/dist para probarla
```

## Publicación

El workflow `.github/workflows/deploy.yml` compila y publica la web en GitHub Pages cada vez que se hace push a `main` con cambios en `web/`.

Configuración única en GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Estructura

```
web/
├── public/images/        imágenes originales de la app (íconos y diagramas de tablas)
├── src/
│   ├── data/content.js   textos, consultas y notas de cada tema
│   ├── data/seed.js      esquemas y datos (escuela, tienda, empresa, supermarket)
│   ├── lib/db.js         PostgreSQL en el navegador (PGlite)
│   ├── components/       barra superior, bloques SQL, tablas de resultado, diagramas de Venn
│   └── pages/            una pantalla por sección
└── vite.config.js
```

Para cambiar un texto o una consulta basta con editar `src/data/content.js`.

## Notas sobre el contenido

- Las consultas se tomaron de los scripts `.sql` del repositorio, que corrigen algunos nombres de columna que aparecen distinto en la app (`descripcion` → `nombre`, `nom_empleado` → `nombre`, `detalle_dedido` → `detalle_pedido`).
- Las fechas de los datos están en formato día/mes/año, por eso la base de datos se crea con `SET datestyle = 'ISO, DMY'`.
- El enunciado del ejercicio 2 pide ordenar el año en forma descendente, pero la solución usa `ORDER BY 1` (ascendente). Se dejó igual que en el script original.
